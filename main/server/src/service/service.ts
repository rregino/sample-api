import * as PX from "../../../proto/xpress";
import { Db, SimpleDb } from "../model/db";
import { NewUser, User } from "../model/user";
import * as E from "fp-ts/lib/Either"
import { CancelOrderResponse, GetOrderPriceResponse, RequestOrderResponse } from "../model/courier";
import { Booking } from "../model/booking";
import { randomUUID } from "crypto";
import { CourierClient } from "../model/courierClient";

export class Service {

  userDb: Db<number, NewUser, User>;
  bookingDb: SimpleDb<string, Booking>;
  courierClients: Array<CourierClient<PX.CourierType>>;

  constructor(
    userDb: Db<number, NewUser, User>,
    bookingDb: SimpleDb<string, Booking>,
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

  getAvailableCouriers(pickup?: PX.Point, dropoff?: PX.Point): Array<() => Promise<PX.GetAvailableCouriersResponse>> {
    return this.courierClients.map(client => {
      return () => this.getCourierPrice(client, pickup, dropoff);
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

  private getCourierPrice(client: CourierClient<PX.CourierType>, pickup?: PX.Point, dropoff?: PX.Point): Promise<PX.GetAvailableCouriersResponse> {
    if(pickup && dropoff) {
      return client.getOrderPrice(pickup, dropoff)
        .then(res => this.resolveGetOrderPriceResponse(res, pickup, dropoff));
    } else {
      return this.resolveError('Invalid points');
    }
  }

  private resolveGetOrderPriceResponse(res: GetOrderPriceResponse, pickup: PX.Point, dropoff: PX.Point): Promise<PX.GetAvailableCouriersResponse> {
    if(E.isRight(res)) {
      const { bookingType, price } = res.right;
      const booking: Booking =
        { id: randomUUID()
        , origin: pickup
        , destination: dropoff
        , status: PX.BookingStatus.NO_STATUS
        , bookingType
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
      this.updateBooking(booking, bookingUpdates);
      return this.resolveSuccess({ id: booking.id });
    } else {
      return this.resolveError(res.left);
    }
  }

  private resolveCancelOrderResponse(res: CancelOrderResponse, booking: Booking): Promise<PX.CancelBookingResponse> {
    if(E.isRight(res)) {
      const bookingUpdates = { bookingOrderId: undefined, status: PX.BookingStatus.CANCELED };
      this.updateBooking(booking, bookingUpdates);
      return this.resolveSuccess({});
    } else {
      return this.resolveError(res.left);
    }
  }

  private updateBooking(originalBooking: Booking, partialBooking: Partial<Booking>) {
    const updatedBooking: Booking = {...originalBooking, ...partialBooking };
    this.bookingDb.update(updatedBooking);
  }

  //assumes response have the same type
  private resolveSuccess<S>(s: S): Promise<{ success: S }> {
    return Promise.resolve({ success: s });
  }

  private resolveError(msg: string): Promise<{ error: { errorMessage: string }}> {
    return Promise.resolve({ error: { errorMessage: msg } });
  }
}