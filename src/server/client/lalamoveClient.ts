import { CourierClient } from "../model/courierClient";
import * as PX from '../../proto/xpress';
import { GetOrderPriceResponse, RequestOrderResponse, CancelOrderResponse, GetOrderPriceError, GetOrderPriceSuccess, RequestOrderError, RequestOrderSuccess, CancelOrderError, CancelOrderSuccess } from "../model/courier";
import { randomUUID, createHmac } from "crypto";
import { ApiError, ApiResponse, callApi, HttpMethod } from "./apiClient";
import * as t from 'io-ts';
import * as E from "fp-ts/lib/Either"
import { LalamoveBooking } from "../model/booking";
import { returnVoid } from "../utils/helpers";

class LalamoveClient implements CourierClient<PX.CourierType.LALAMOVE> {

  keys: { apiKey: string, apiSecret: string };
  courierType: PX.CourierType.LALAMOVE = PX.CourierType.LALAMOVE;

  private url = 'https://rest.sandbox.lalamove.com';

  constructor(keys: { apiKey: string, apiSecret: string }) {
    this.keys = keys;
  }

  getOrderPrice(pickup: PX.Point, dropoff: PX.Point): Promise<GetOrderPriceResponse> {
    const request = {
      serviceType: 'MOTORCYCLE',
      stops: [ this.assembleDeliveryStop(pickup), this.assembleDeliveryStop(dropoff) ],
      language: 'en_PH'
    };

    return this.processApiRequest<GetQuotationRequest, GetQuotationResponse>('/v3/quotations', 'POST', request, GetQuotationResponse).then(res => {
      return E.fold<ApiError, GetQuotationResponse, GetOrderPriceResponse>(
        left => GetOrderPriceError(left.message),
        right => {
          const { quotationId, stops, priceBreakdown } = right;
          if (stops.length == 2) {
            const [ originStop, destinationStop ] = right.stops;
            const price = parseFloat(priceBreakdown.total);
            const stopId = { origin: originStop.stopId, destination: destinationStop.stopId };
            const bookingType: LalamoveBooking = { _kind: PX.CourierType.LALAMOVE, quotationId, stopId };
            return GetOrderPriceSuccess({ price, bookingType });
          } else
            return GetOrderPriceError('Invalid number of stops');
        }
      )(res);
    });
  }

  requestOrder(pickup: PX.Point, dropoff: PX.Point, bookingType: LalamoveBooking): Promise<RequestOrderResponse> {
    const request = {
      quotationId: bookingType.quotationId,
      sender: assembleDeliveryDetails(pickup, bookingType.stopId.origin),
      recipients: [ assembleDeliveryDetails(dropoff, bookingType.stopId.destination) ]
    }

    function assembleDeliveryDetails(point: PX.Point, stopId: string) {
      return { stopId: stopId, name: point.fullName, phone: `+${point.mobileNumber}` };
    }

    return this.processApiRequest<PlaceOrderRequest, PlaceOrderResponse>('/v3/orders', 'POST', request, PlaceOrderResponse).then(res => {
      return E.fold<ApiError, PlaceOrderResponse, RequestOrderResponse>(
        left => RequestOrderError(left.message),
        right => RequestOrderSuccess({ orderId: right.orderId })
      )(res);
    });
  }

  cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    return this.processApiRequest<void, void>(`/v3/orders/${orderId}`, 'DELETE', returnVoid() , t.void).then(res => {
      return E.fold<ApiError, void, CancelOrderResponse>(
        left => CancelOrderError(left.message),
        _ => CancelOrderSuccess
      )(res);
    });
  }

  private processApiRequest<Req, Res>(
    path: string,
    method: HttpMethod,
    req: Req,
    resType: t.Type<Res>
  ): Promise<ApiResponse<Res>> {
    const requestId = randomUUID().toString();
    const time = new Date().getTime().toString();
    const lalamoveRequest: LalamoveRequest<Req> = { data: req };
    const bodyStr = JSON.stringify(lalamoveRequest);

    const getBody = () => {
      if(method == 'POST' || method == 'PUT') return bodyStr;
      else return '';
    }

    const body = getBody();
    const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
    const hmac = createHmac('sha256', this.keys.apiSecret);
    const signature = hmac.update(rawSignature, 'utf-8').digest('hex'); //can fail

    const token = `${this.keys.apiKey}:${time}:${signature}`;
    const headers = {
      'Authorization': `hmac ${token}`,
      'Market': 'PH',
      'Request-ID': requestId
    };

    const url = `${this.url}${path}`;

    const LalamoveResponse = t.type({
      data: resType
    });

    type LalamoveResponse = t.TypeOf<typeof LalamoveResponse>

    return callApi<LalamoveRequest<Req>, LalamoveResponse>(url, method, lalamoveRequest, LalamoveResponse, headers).then((res) => {
      return E.map<LalamoveResponse, Res>(r => r.data)(res)
    });
  }

  private assembleDeliveryStop(point: PX.Point): DeliveryStop {
    return { coordinates: { lat: point.lat.toString(), lng: point.lng.toString() },
      address: point.address
    };
  }
}

type LalamoveRequest<Req> = { data: Req }

interface DeliveryStop {
  coordinates: { lat: string, lng: string },
  address: string
}

interface GetQuotationRequest {
  serviceType: string,
  stops: Array<DeliveryStop>,
  language: string
}

const GetQuotationResponse = t.type({
  quotationId: t.string,
  stops: t.array(t.type({
    stopId: t.string
  })),
  priceBreakdown: t.type({
    total: t.string
  })
});
type GetQuotationResponse = t.TypeOf<typeof GetQuotationResponse>

interface DeliveryDetails {
  stopId: string,
  name: string,
  phone: string //63 format
}

interface PlaceOrderRequest {
  quotationId: string,
  sender: DeliveryDetails,
  recipients: Array<DeliveryDetails>
}

const PlaceOrderResponse = t.type({
  orderId: t.string
});
type PlaceOrderResponse = t.TypeOf<typeof PlaceOrderResponse>

export {
  LalamoveClient
}