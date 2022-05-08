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
      const { pickUp, dropOff } = call.request;
      const availableCouriers = this.svc.getAvailableCouriers(pickUp, dropOff);
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
    listBookings: (call: ServerUnaryCall<P.Empty, PX.ListBookingsResponse>, callback: sendUnaryData<PX.ListBookingsResponse>): void => {
      const bookings = this.svc.listBookings();
      callback(null, { bookings });
    }
  }
}

export {
  XpressServerImpl
}