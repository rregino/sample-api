import fetch from 'node-fetch';
import * as t from 'io-ts';
import { Either } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiError {
  statusCode: number,
  message: string
}

type ApiResponse<Res> = Either<ApiError, Res>

function callApi<Req, Res>(
  url: string,
  method: HttpMethod,
  req: Req,
  resType: t.Type<Res>,
  headers?: { [key: string]: string },
): Promise<ApiResponse<Res>> {

  const getBody = () => {
    if(method == 'POST' || method == 'PUT')
      return { body: JSON.stringify(req) }
    else return {};
  }

  const others = getBody();

  return fetch(url, { method, headers, ...others })
    .then(res => {
      const statusCode = res.status;
      if(statusCode >= 200 && statusCode < 300) {
        return res.json().catch((_) => {});
      } else {
        return rejectApiError({ statusCode, message: res.statusText  });
      }
    })
    .then(json => {
      const res = resType.decode(json);
      switch(res._tag) {
        case "Right": return returnApiSuccess(res.right);
        case "Left":
          res.left.map(l => console.warn(l.context));
          return rejectApiError({ statusCode: 400, message: 'Unable to parse JSON' });
      }
      // return json as Res; //does not return an error if incorrectly parsed
    })
    .catch(err => {
      const getApiError: () => ApiError = () => {
        if(err.statusCode && err.message)
          return { statusCode: err.statusCode, message: err.message };
        else
          return { statusCode: 500, message: `Unexpected error: ${err}` };
      }
      return returnApiError(getApiError());
    });

    function returnApiSuccess(res: Res) {
      return Promise.resolve(E.right<ApiError, Res>(res));
    }

    function returnApiError(apiError: ApiError) {
      return Promise.resolve(E.left<ApiError, Res>(apiError));
    }

    function rejectApiError(apiError: ApiError) {
      return Promise.reject(apiError);
    }
}

export {
  callApi,
  HttpMethod,
  ApiResponse,
  ApiError
}