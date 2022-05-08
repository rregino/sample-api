import { string } from "fp-ts"
import * as PX from "../../../proto/xpress"

interface BorzoBooking {
  _kind: PX.CourierType.BORZO
}

interface LalamoveBooking {
  _kind: PX.CourierType.LALAMOVE
  quotationId: string
  stopId: { origin: string, destination: string }
}

type BookingType = BorzoBooking | LalamoveBooking

interface Booking {
  id: string,
  origin: PX.Point,
  destination: PX.Point,
  status: PX.BookingStatus,
  bookingType: BookingType,
  bookingOrderId?: string,
  createdAt: Date
}

export {
  BorzoBooking,
  LalamoveBooking,
  Booking,
  BookingType
}