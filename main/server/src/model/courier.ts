import * as E from "fp-ts/lib/Either"
import { Either } from "fp-ts/lib/Either"
import { constVoid } from "fp-ts/lib/function";
import { BookingType } from "./booking"

type ToEither<In, Out> = (r: In) => Out;

// GetOrderPriceResponse
type GetOrderPriceSuccess = { price: number, bookingType: BookingType }
type GetOrderPriceError = string
type GetOrderPriceResponse = Either<GetOrderPriceError, GetOrderPriceSuccess>

const GetOrderPriceSuccess: ToEither<GetOrderPriceSuccess, GetOrderPriceResponse> =
  (r) => E.right<GetOrderPriceError, GetOrderPriceSuccess>(r);

const GetOrderPriceError: ToEither<GetOrderPriceError, GetOrderPriceResponse> =
  (r) => E.left<GetOrderPriceError, GetOrderPriceSuccess>(r);

// RequestOrderResponse
type RequestOrderSuccess = { orderId: string }
type RequestOrderError = string
type RequestOrderResponse = Either<RequestOrderError, RequestOrderSuccess>

const RequestOrderSuccess: ToEither<RequestOrderSuccess, RequestOrderResponse> =
  (r) => E.right<RequestOrderError, RequestOrderSuccess>(r);

const RequestOrderError: ToEither<RequestOrderError, RequestOrderResponse> =
  (r) => E.left<RequestOrderError, RequestOrderSuccess>(r);

// CancelOrderResponse
type CancelOrderError = string;
type CancelOrderResponse = Either<CancelOrderError, void>

const CancelOrderSuccess = E.right<RequestOrderError, void>(constVoid());
const CancelOrderError: ToEither<RequestOrderError, CancelOrderResponse> =
  (r) => E.left<RequestOrderError, void>(r);

export {
  CancelOrderError,
  CancelOrderSuccess,
  CancelOrderResponse,
  GetOrderPriceError,
  GetOrderPriceResponse,
  GetOrderPriceSuccess,
  RequestOrderError,
  RequestOrderResponse,
  RequestOrderSuccess
}
