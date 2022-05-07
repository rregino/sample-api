import { Point } from "../../proto/xpress"
import { CancelOrderResponse, GetOrderPriceResponse, RequestOrderResponse } from "./courier"

interface CourierClient <T> {
  courierType: T
  getOrderPrice(pickup: Point, dropoff: Point): Promise<GetOrderPriceResponse>
  requestOrder(pickup: Point, dropoff: Point): Promise<RequestOrderResponse>
  cancelOrder(orderId: string): Promise<CancelOrderResponse>
}

export {
  CourierClient
}