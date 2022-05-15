import * as PX from "../../../proto/xpress";
import { Db, SimpleDb } from "../model/db";
import { NewUser, User } from "../model/user";
import * as E from "fp-ts/lib/Either"
import { CancelOrderResponse, GetOrderPriceResponse, RequestOrderResponse } from "../model/courier";
import { Booking } from "../model/booking";
import { randomUUID } from "crypto";
import { CourierClient } from "../model/courierClient";
import { BookingDb } from "../repo/bookingdb";

export class Service {

  userDb: Db<string, NewUser, User>;
  bookingDb: BookingDb;
  courierClients: Array<CourierClient<PX.CourierType>>;

  constructor(
    userDb: Db<string, NewUser, User>,
    bookingDb: BookingDb,
    courierClients: Array<CourierClient<PX.CourierType>>
  ) {
    this.userDb = userDb;
    this.bookingDb = bookingDb;
    this.courierClients = courierClients;
  }

  createUser(user: NewUser): User {
    return this.userDb.save(user);
  }

  listUsers(): Array<User> {
    return this.userDb.list();
  }

  getUser(id: string): User | undefined {
    return this.userDb.get(id);
  }

  getAvailableCouriers(pickup?: PX.Point, userId?: string, dropoff?: PX.Point): Array<() => Promise<PX.GetAvailableCouriersResponse>> {
    return this.courierClients.map(client => {
      return () => this.getCourierPrice(client, { pickup, userId} , dropoff);
    });
  }

  bookCourier(id: string): Promise<PX.BookCourierResponse> {
    const booking = this.bookingDb.get(id);
    const client = this.courierClients.find(c => c.courierType == booking?.bookingType._kind);

    if(booking && client) {
      return client.requestOrder(booking.origin, booking.destination, booking.bookingType)
          .then(res => this.resolveRequestOrderResponse(res, booking))
    } else
      return this.resolveError('Booking not found');
  }

  cancelBooking(id: string): Promise<PX.CancelBookingResponse> {
    const booking = this.bookingDb.get(id);
    const client = this.courierClients.find(c => c.courierType == booking?.bookingType._kind);

    if(booking && client) {
      if(booking.status == PX.BookingStatus.CANCELED)
        return this.resolveSuccess({});
      else if(booking.bookingOrderId)
        return client.cancelOrder(booking.bookingOrderId)
          .then(res => this.resolveCancelOrderResponse(res, booking));
      else
        return this.resolveError('Order ID not found');
    } else
      return this.resolveError('Booking not found');
  }

  listBookings(): Array<PX.Booking> {
    return this.bookingDb.list().map(({ id, origin, destination, bookingType, status }) => {
      return { id, origin, destination , courier: bookingType._kind, status };
    });
  }

  listUserBookings(userId: string, status: Array<PX.BookingStatus>): Array<PX.Booking> {
    const user = this.userDb.get(userId);
    if(user) {
      return this.bookingDb.getBookingsForUser(user.id, status).map(b => this.toPXBooking(b));
    } else {
      return [];
    }
  }

  getBooking(id: string): PX.Booking | undefined {
    const booking = this.bookingDb.get(id);
    if(booking) return this.toPXBooking(booking);
  }

  private getCourierPrice(client: CourierClient<PX.CourierType>, origin: { pickup?: PX.Point, userId?: string },  destination?: PX.Point): Promise<PX.GetAvailableCouriersResponse> {
    if(destination) {
      const callApi = (pickup: PX.Point, dropoff: PX.Point, userId?: string) => {
        return client.getOrderPrice(pickup, dropoff)
        .then(res => this.resolveGetOrderPriceResponse(res, pickup, dropoff, userId));
      }

      const handleUserBooking = (userId: string) => {
        const user = this.userDb.get(userId);
        if(user) return callApi(this.userToPoint(user), destination, user.id);
        else return this.resolveError('User not found');
      }

      if(origin.pickup) {
        return callApi(origin.pickup, destination);
      } else if(origin.userId) {
        return handleUserBooking(origin.userId);
      } else return this.resolveError('Invalid origin');
    } else return this.resolveError('Invalid destination');
  }

  private resolveGetOrderPriceResponse(res: GetOrderPriceResponse, pickup: PX.Point, dropoff: PX.Point, userId?: string): Promise<PX.GetAvailableCouriersResponse> {
    if(E.isRight(res)) {
      const { bookingType, price } = res.right;
      const booking: Booking =
        { id: randomUUID()
        , origin: pickup
        , destination: dropoff
        , status: PX.BookingStatus.NO_STATUS
        , bookingType
        , userId: userId
        , createdAt: new Date()
        };
      this.bookingDb.save(booking);

      return this.resolveSuccess({ id: booking.id.toString(), courier: bookingType._kind, price });
    } else {
      return this.resolveError(res.left);
    }
  }

  private resolveRequestOrderResponse(res: RequestOrderResponse, booking: Booking): Promise<PX.BookCourierResponse> {
    if(E.isRight(res)) {
      const { orderId } = res.right;
      const bookingUpdates = { bookingOrderId: orderId, status: PX.BookingStatus.REQUESTED };
      const updatedBooking = this.updateBooking(booking, bookingUpdates);
      return this.resolveSuccess({ booking: this.toPXBooking(updatedBooking) });
    } else {
      return this.resolveError(res.left);
    }
  }

  private resolveCancelOrderResponse(res: CancelOrderResponse, booking: Booking): Promise<PX.CancelBookingResponse> {
    if(E.isRight(res)) {
      const bookingUpdates = { bookingOrderId: undefined, status: PX.BookingStatus.CANCELED };
      const updatedBooking = this.updateBooking(booking, bookingUpdates);
      return this.resolveSuccess({ booking: this.toPXBooking(updatedBooking) });
    } else {
      return this.resolveError(res.left);
    }
  }

  private updateBooking(originalBooking: Booking, partialBooking: Partial<Booking>): Booking {
    const updatedBooking: Booking = {...originalBooking, ...partialBooking };
    this.bookingDb.update(updatedBooking);
    return updatedBooking;
  }

  private userToPoint(user: User): PX.Point {
    return { fullName: `${user.firstName} ${user.lastName}`,
      mobileNumber: user.mobileNumber,
      address: user.address,
      lat: user.lat,
      lng: user.lng
      };
  }

  //assumes response have the same type
  private resolveSuccess<S>(s: S): Promise<{ success: S }> {
    return Promise.resolve({ success: s });
  }

  private resolveError(msg: string): Promise<{ error: { errorMessage: string }}> {
    return Promise.resolve({ error: { errorMessage: msg } });
  }

  private toPXBooking(booking: Booking): PX.Booking {
    return {
      id: booking.id,
      origin: booking.origin,
      destination: booking.destination,
      courier: booking.bookingType._kind,
      status: booking.status
    }
  }
}