import * as PX from "../../proto/xpress"
import { BookingType } from "./booking"
import { CancelOrderResponse, GetOrderPriceResponse, RequestOrderResponse } from "./courier"

interface CourierClient <T extends PX.CourierType> {
  courierType: T
  getOrderPrice(pickup: PX.Point, dropoff: PX.Point): Promise<GetOrderPriceResponse>
  requestOrder(pickup: PX.Point, dropoff: PX.Point, bookingType: BookingType): Promise<RequestOrderResponse>
  cancelOrder(orderId: string): Promise<CancelOrderResponse>
}

export {
  CourierClient
}