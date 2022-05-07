import { sendUnaryData, ServerUnaryCall, ServerWritableStream } from "@grpc/grpc-js";
import { Empty } from "../../proto/google/protobuf/empty";
import { BookCourierRequest, BookCourierResponse, CancelBookingRequest, CancelBookingResponse, GetAvailableCouriersRequest, GetAvailableCouriersResponse, ListBookingsResponse, XpressServer, XpressService } from "../../proto/xpress";
import { ServerImpl } from "../model/serverImpl";
import { Service } from "../service/service";

class XpressServerImpl implements ServerImpl<XpressService, XpressServer> {
  svc: Service;

  serviceDefinition = XpressService;

  constructor(s: Service) {
    this.svc = s;
  }

  public Impl: XpressServer = {
    getAvailableCouriers: (call: ServerWritableStream<GetAvailableCouriersRequest, GetAvailableCouriersResponse>): void => {
      const { pickUp, dropOff } = call.request;
      const availableCouriers = this.svc.getAvailableCouriers(pickUp, dropOff);
      Promise.allSettled(
        availableCouriers.map(func => {
          return func().then(res => call.write(res));
        })
      ).then(() => call.end());
    },
    bookCourier: (call: ServerUnaryCall<BookCourierRequest, BookCourierResponse>, callback: sendUnaryData<BookCourierResponse>): void => {
      this.svc.bookCourier(call.request.id).then(res => callback(null, res));
    },
    cancelBooking: (call: ServerUnaryCall<CancelBookingRequest, CancelBookingResponse>, callback: sendUnaryData<CancelBookingResponse>): void => {
      this.svc.cancelBooking(call.request.id).then(res => callback(null, res));
    },
    listBookings: (call: ServerUnaryCall<Empty, ListBookingsResponse>, callback: sendUnaryData<ListBookingsResponse>): void => {
      const bookings = this.svc.listBookings();
      callback(null, { bookings });
    }
  }
}

export {
  XpressServerImpl
}