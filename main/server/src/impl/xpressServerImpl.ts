import { sendUnaryData, ServerUnaryCall, ServerWritableStream } from "@grpc/grpc-js";
import * as P from "../../../proto/google/protobuf/empty";
import * as PX from "../../../proto/xpress";
import { ServerImpl } from "../model/serverImpl";
import { Service } from "../service/service";

class XpressServerImpl implements ServerImpl<PX.XpressService, PX.XpressServer> {
  svc: Service;

  serviceDefinition = PX.XpressService;

  constructor(s: Service) {
    this.svc = s;
  }

  public Impl: PX.XpressServer = {
    getAvailableCouriers: (call: ServerWritableStream<PX.GetAvailableCouriersRequest, PX.GetAvailableCouriersResponse>): void => {
      const { pickUp, userId, dropOff } = call.request;
      const availableCouriers = this.svc.getAvailableCouriers(pickUp, userId, dropOff);
      Promise.allSettled(
        availableCouriers.map(func => {
          return func().then(res => call.write(res));
        })
      ).then(() => call.end());
    },
    bookCourier: (call: ServerUnaryCall<PX.BookCourierRequest, PX.BookCourierResponse>, callback: sendUnaryData<PX.BookCourierResponse>): void => {
      this.svc.bookCourier(call.request.id).then(res => callback(null, res));
    },
    cancelBooking: (call: ServerUnaryCall<PX.CancelBookingRequest, PX.CancelBookingResponse>, callback: sendUnaryData<PX.CancelBookingResponse>): void => {
      this.svc.cancelBooking(call.request.id).then(res => callback(null, res));
    },
    listBookings: (call: ServerUnaryCall<PX.ListBookingsRequest, PX.ListBookingsResponse>, callback: sendUnaryData<PX.ListBookingsResponse>): void => {
      const listBookings = () => {
        if(call.request.filter?.userId)
          return this.svc.listUserBookings(call.request.filter?.userId, call.request.filter.statuses);
        else
          return this.svc.listBookings();
      };
      const bookings = listBookings();
      callback(null, { bookings });
    },
    getBooking: (call: ServerUnaryCall<PX.GetBookingRequest, PX.GetBookingResponse>, callback: sendUnaryData<PX.GetBookingResponse>): void => {
      const booking = this.svc.getBooking(call.request.id);
      callback(null, { booking })
    }
  }
}

export {
  XpressServerImpl
}