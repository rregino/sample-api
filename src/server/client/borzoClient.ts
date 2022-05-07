// import { CourierType, Point } from '../../proto/xpress';
import * as PX from '../../proto/xpress';
import { ApiError, ApiResponse, callApi } from "./apiClient";
import * as t from 'io-ts';
import { CourierClient } from '../model/courierClient';
import { CancelOrderError, CancelOrderResponse, CancelOrderSuccess, GetOrderPriceError, GetOrderPriceResponse, GetOrderPriceSuccess, RequestOrderError, RequestOrderResponse, RequestOrderSuccess } from '../model/courier';
// import { left, right } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';

class BorzoClient implements CourierClient<PX.CourierType>{

  apiToken: string;
  courierType = PX.CourierType.BORZO;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  private url = 'https://robotapitest-ph.borzodelivery.com/api/business/1.1';

  //to add - cash on delivery
  getOrderPrice(pickup: PX.Point, dropoff: PX.Point): Promise<GetOrderPriceResponse> {
    const url = `${this.url}/calculate-order`;

    const request = this.assembleOrderRequest(pickup, dropoff);

    return callApi<CalculateRequest, CalculateResponse>(url, 'POST', request, CalculateResponse, this.getHeaders()).then(res => {
      return E.fold<ApiError, CalculateResponse, GetOrderPriceResponse>(
        left => GetOrderPriceError(left.message),
        right => {
          const { is_successful, order, warnings } = right;
          if(is_successful && warnings.length == 0)
            return GetOrderPriceSuccess( { price: parseFloat(order.payment_amount), bookingType: { _kind: PX.CourierType.BORZO } });
          else if (warnings.length > 0)
            return GetOrderPriceError(warnings.join(','));
          else
            return GetOrderPriceError('Unexpected error');
        }
      )(res)
    });
  }

  requestOrder(pickup: PX.Point, dropoff: PX.Point): Promise<RequestOrderResponse> {
    const url = `${this.url}/create-order`;

    const request = this.assembleOrderRequest(pickup, dropoff);

    return callApi<CreateRequest, CreateResponse>(url, 'POST', request, CreateResponse, this.getHeaders()).then(res => {
      return E.fold<ApiError, CreateResponse, RequestOrderResponse>(
        left => RequestOrderError(left.message),
        right => {
          const { is_successful, order } = right;
          if(is_successful)
            return RequestOrderSuccess( { orderId: order.order_id.toString() });
          else
            return RequestOrderError('Unexpected error');
        }
      )(res)
    });
  }

  cancelOrder(orderId: string): Promise<CancelOrderResponse> {
    const url = `${this.url}/cancel-order`;

    const request = { order_id: orderId };

    return callApi<CancelRequest, CancelResponse>(url, 'POST', request, CancelResponse, this.getHeaders()).then(res => {
      return E.fold<ApiError, CancelResponse, CancelOrderResponse>(
        left => CancelOrderError(left.message),
        right => {
          if(right.is_successful) return CancelOrderSuccess;
          else return CancelOrderError('Cancel failed');
        }
      )(res)
    });
  }

  private getHeaders() {
    return { 'X-DV-Auth-Token': this.apiToken };
  }

  private assembleOrderRequest(pickup: PX.Point, dropoff: PX.Point): CreateRequest {
    return { type: 'standard'
      , matter: 'Packages'
      , vehicle_type_id: '8'
      , payment_method: 'non_cash'
      , points:
        [ this.assembleBorzoPoint(pickup)
        , this.assembleBorzoPoint(dropoff)
        ]
    };
  }

  private assembleBorzoPoint(point: PX.Point): BorzoPoint {
    const p =
      { address: point.address
      , contact_person:
        { phone: point.mobileNumber
        , name: point.fullName
        }
      , latitude: point.lat.toString()
      , longitude: point.lng.toString()
      };
    return p;
  }
}

interface BorzoPoint {
  address: string,
  contact_person: {
    phone: string, //63 format
    name: string
  },
  latitude: string,
  longitude: string
}

interface CalculateRequest {
  type: string,
  matter: string,
  vehicle_type_id: string,
  payment_method: string,
  points: Array<BorzoPoint>
}

const CalculateResponse = t.type({
  is_successful: t.boolean,
  order: t.type({
    order_id: t.union([t.string, t.null]),
    payment_amount: t.string
  }),
  warnings: t.array(t.string)
});

type CalculateResponse = t.TypeOf<typeof CalculateResponse>

interface CreateRequest extends CalculateRequest {}

const CreateResponse = t.type({
  is_successful: t.boolean,
  order: t.type({
    order_id: t.number,
    payment_amount: t.string,
    status: t.string
  })
})

type CreateResponse = t.TypeOf<typeof CreateResponse>

interface CancelRequest {
  order_id: string
}

const CancelResponse = t.type({
  is_successful: t.boolean
});

type CancelResponse = t.TypeOf<typeof CancelResponse>

export {
  BorzoClient
}

