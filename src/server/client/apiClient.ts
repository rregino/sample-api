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
  return fetch(url, { method, body: JSON.stringify(req), headers })
    .then(res => {
      const statusCode = res.status;
      if(statusCode >= 200 && statusCode < 300) {
        return res.json();
      } else {
        return returnApiError({ statusCode, message: res.statusText  });
      }
    })
    .then(json => {
      const res = resType.decode(json);
      switch(res._tag) {
        case "Right": return returnApiSuccess(res.right);
        case "Left":
          res.left.map(l => console.warn(l.context));
          return returnApiError({ statusCode: 400, message: 'Unable to parse JSON' });
      }
      // return json as Res; //does not return an error if incorrectly parsed
    })
    .catch(err => {
      console.error(err);
      return returnApiError({ statusCode: 500, message: `Unexpected error: ${err}` });
    });

    function returnApiSuccess(res: Res) {
      return Promise.resolve(E.right<ApiError, Res>(res));
    }

    function returnApiError(apiError: ApiError) {
      return Promise.resolve(E.left<ApiError, Res>(apiError));
    }
}

export {
  callApi,
  HttpMethod,
  ApiResponse,
  ApiError
}