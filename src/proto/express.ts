/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleServerStreamingCall,
  handleUnaryCall,
  Client,
  CallOptions,
  ClientReadableStream,
  Metadata,
  ClientUnaryCall,
  ServiceError,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export enum CommonCourierErrorCode {
  ERROR_UNKNOWN = 0,
  INVALID_DETAILS = 1,
  UNRECOGNIZED = -1,
}

export function commonCourierErrorCodeFromJSON(
  object: any
): CommonCourierErrorCode {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return CommonCourierErrorCode.ERROR_UNKNOWN;
    case 1:
    case "INVALID_DETAILS":
      return CommonCourierErrorCode.INVALID_DETAILS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonCourierErrorCode.UNRECOGNIZED;
  }
}

export function commonCourierErrorCodeToJSON(
  object: CommonCourierErrorCode
): string {
  switch (object) {
    case CommonCourierErrorCode.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case CommonCourierErrorCode.INVALID_DETAILS:
      return "INVALID_DETAILS";
    default:
      return "UNKNOWN";
  }
}

export enum CourierType {
  COURIER_UNKNOWN = 0,
  BORZO = 1,
  LALAMOVE = 2,
  UNRECOGNIZED = -1,
}

export function courierTypeFromJSON(object: any): CourierType {
  switch (object) {
    case 0:
    case "COURIER_UNKNOWN":
      return CourierType.COURIER_UNKNOWN;
    case 1:
    case "BORZO":
      return CourierType.BORZO;
    case 2:
    case "LALAMOVE":
      return CourierType.LALAMOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CourierType.UNRECOGNIZED;
  }
}

export function courierTypeToJSON(object: CourierType): string {
  switch (object) {
    case CourierType.COURIER_UNKNOWN:
      return "COURIER_UNKNOWN";
    case CourierType.BORZO:
      return "BORZO";
    case CourierType.LALAMOVE:
      return "LALAMOVE";
    default:
      return "UNKNOWN";
  }
}

export interface Point {
  fullName: string;
  mobileNumber: string;
  address: string;
  lat: number;
  lng: number;
}

export interface GetCourierPricesRequest {
  pickUp?: Point;
  dropOff?: Point;
}

export interface GetCourierPricesResponse {
  success?: GetCourierPricesResponse_Success | undefined;
  error?: GetCourierPricesResponse_Error | undefined;
}

export interface GetCourierPricesResponse_Error {
  code: CommonCourierErrorCode;
}

export interface GetCourierPricesResponse_Success {
  deliveryId: string;
  courier: CourierType;
  price: number;
}

export interface BookCourierRequest {
  pickUp?: Point;
  dropOff?: Point;
}

export interface BookCourierResponse {
  success?: BookCourierResponse_Success | undefined;
  error?: BookCourierResponse_Error | undefined;
}

export interface BookCourierResponse_Error {
  code: CommonCourierErrorCode;
}

export interface BookCourierResponse_Success {
  id: string;
}

function createBasePoint(): Point {
  return { fullName: "", mobileNumber: "", address: "", lat: 0, lng: 0 };
}

export const Point = {
  encode(message: Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullName !== "") {
      writer.uint32(10).string(message.fullName);
    }
    if (message.mobileNumber !== "") {
      writer.uint32(18).string(message.mobileNumber);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.lat !== 0) {
      writer.uint32(33).double(message.lat);
    }
    if (message.lng !== 0) {
      writer.uint32(41).double(message.lng);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullName = reader.string();
          break;
        case 2:
          message.mobileNumber = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.lat = reader.double();
          break;
        case 5:
          message.lng = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Point {
    return {
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
      mobileNumber: isSet(object.mobileNumber)
        ? String(object.mobileNumber)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      lat: isSet(object.lat) ? Number(object.lat) : 0,
      lng: isSet(object.lng) ? Number(object.lng) : 0,
    };
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    message.fullName !== undefined && (obj.fullName = message.fullName);
    message.mobileNumber !== undefined &&
      (obj.mobileNumber = message.mobileNumber);
    message.address !== undefined && (obj.address = message.address);
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Point>, I>>(object: I): Point {
    const message = createBasePoint();
    message.fullName = object.fullName ?? "";
    message.mobileNumber = object.mobileNumber ?? "";
    message.address = object.address ?? "";
    message.lat = object.lat ?? 0;
    message.lng = object.lng ?? 0;
    return message;
  },
};

function createBaseGetCourierPricesRequest(): GetCourierPricesRequest {
  return { pickUp: undefined, dropOff: undefined };
}

export const GetCourierPricesRequest = {
  encode(
    message: GetCourierPricesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pickUp !== undefined) {
      Point.encode(message.pickUp, writer.uint32(10).fork()).ldelim();
    }
    if (message.dropOff !== undefined) {
      Point.encode(message.dropOff, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCourierPricesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCourierPricesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pickUp = Point.decode(reader, reader.uint32());
          break;
        case 2:
          message.dropOff = Point.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCourierPricesRequest {
    return {
      pickUp: isSet(object.pickUp) ? Point.fromJSON(object.pickUp) : undefined,
      dropOff: isSet(object.dropOff)
        ? Point.fromJSON(object.dropOff)
        : undefined,
    };
  },

  toJSON(message: GetCourierPricesRequest): unknown {
    const obj: any = {};
    message.pickUp !== undefined &&
      (obj.pickUp = message.pickUp ? Point.toJSON(message.pickUp) : undefined);
    message.dropOff !== undefined &&
      (obj.dropOff = message.dropOff
        ? Point.toJSON(message.dropOff)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCourierPricesRequest>, I>>(
    object: I
  ): GetCourierPricesRequest {
    const message = createBaseGetCourierPricesRequest();
    message.pickUp =
      object.pickUp !== undefined && object.pickUp !== null
        ? Point.fromPartial(object.pickUp)
        : undefined;
    message.dropOff =
      object.dropOff !== undefined && object.dropOff !== null
        ? Point.fromPartial(object.dropOff)
        : undefined;
    return message;
  },
};

function createBaseGetCourierPricesResponse(): GetCourierPricesResponse {
  return { success: undefined, error: undefined };
}

export const GetCourierPricesResponse = {
  encode(
    message: GetCourierPricesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success !== undefined) {
      GetCourierPricesResponse_Success.encode(
        message.success,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      GetCourierPricesResponse_Error.encode(
        message.error,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCourierPricesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCourierPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = GetCourierPricesResponse_Success.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.error = GetCourierPricesResponse_Error.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCourierPricesResponse {
    return {
      success: isSet(object.success)
        ? GetCourierPricesResponse_Success.fromJSON(object.success)
        : undefined,
      error: isSet(object.error)
        ? GetCourierPricesResponse_Error.fromJSON(object.error)
        : undefined,
    };
  },

  toJSON(message: GetCourierPricesResponse): unknown {
    const obj: any = {};
    message.success !== undefined &&
      (obj.success = message.success
        ? GetCourierPricesResponse_Success.toJSON(message.success)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? GetCourierPricesResponse_Error.toJSON(message.error)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCourierPricesResponse>, I>>(
    object: I
  ): GetCourierPricesResponse {
    const message = createBaseGetCourierPricesResponse();
    message.success =
      object.success !== undefined && object.success !== null
        ? GetCourierPricesResponse_Success.fromPartial(object.success)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? GetCourierPricesResponse_Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseGetCourierPricesResponse_Error(): GetCourierPricesResponse_Error {
  return { code: 0 };
}

export const GetCourierPricesResponse_Error = {
  encode(
    message: GetCourierPricesResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCourierPricesResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCourierPricesResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCourierPricesResponse_Error {
    return {
      code: isSet(object.code)
        ? commonCourierErrorCodeFromJSON(object.code)
        : 0,
    };
  },

  toJSON(message: GetCourierPricesResponse_Error): unknown {
    const obj: any = {};
    message.code !== undefined &&
      (obj.code = commonCourierErrorCodeToJSON(message.code));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCourierPricesResponse_Error>, I>>(
    object: I
  ): GetCourierPricesResponse_Error {
    const message = createBaseGetCourierPricesResponse_Error();
    message.code = object.code ?? 0;
    return message;
  },
};

function createBaseGetCourierPricesResponse_Success(): GetCourierPricesResponse_Success {
  return { deliveryId: "", courier: 0, price: 0 };
}

export const GetCourierPricesResponse_Success = {
  encode(
    message: GetCourierPricesResponse_Success,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.deliveryId !== "") {
      writer.uint32(10).string(message.deliveryId);
    }
    if (message.courier !== 0) {
      writer.uint32(16).int32(message.courier);
    }
    if (message.price !== 0) {
      writer.uint32(25).double(message.price);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCourierPricesResponse_Success {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCourierPricesResponse_Success();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deliveryId = reader.string();
          break;
        case 2:
          message.courier = reader.int32() as any;
          break;
        case 3:
          message.price = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCourierPricesResponse_Success {
    return {
      deliveryId: isSet(object.deliveryId) ? String(object.deliveryId) : "",
      courier: isSet(object.courier) ? courierTypeFromJSON(object.courier) : 0,
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: GetCourierPricesResponse_Success): unknown {
    const obj: any = {};
    message.deliveryId !== undefined && (obj.deliveryId = message.deliveryId);
    message.courier !== undefined &&
      (obj.courier = courierTypeToJSON(message.courier));
    message.price !== undefined && (obj.price = message.price);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetCourierPricesResponse_Success>, I>
  >(object: I): GetCourierPricesResponse_Success {
    const message = createBaseGetCourierPricesResponse_Success();
    message.deliveryId = object.deliveryId ?? "";
    message.courier = object.courier ?? 0;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseBookCourierRequest(): BookCourierRequest {
  return { pickUp: undefined, dropOff: undefined };
}

export const BookCourierRequest = {
  encode(
    message: BookCourierRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pickUp !== undefined) {
      Point.encode(message.pickUp, writer.uint32(10).fork()).ldelim();
    }
    if (message.dropOff !== undefined) {
      Point.encode(message.dropOff, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookCourierRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookCourierRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pickUp = Point.decode(reader, reader.uint32());
          break;
        case 2:
          message.dropOff = Point.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookCourierRequest {
    return {
      pickUp: isSet(object.pickUp) ? Point.fromJSON(object.pickUp) : undefined,
      dropOff: isSet(object.dropOff)
        ? Point.fromJSON(object.dropOff)
        : undefined,
    };
  },

  toJSON(message: BookCourierRequest): unknown {
    const obj: any = {};
    message.pickUp !== undefined &&
      (obj.pickUp = message.pickUp ? Point.toJSON(message.pickUp) : undefined);
    message.dropOff !== undefined &&
      (obj.dropOff = message.dropOff
        ? Point.toJSON(message.dropOff)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierRequest>, I>>(
    object: I
  ): BookCourierRequest {
    const message = createBaseBookCourierRequest();
    message.pickUp =
      object.pickUp !== undefined && object.pickUp !== null
        ? Point.fromPartial(object.pickUp)
        : undefined;
    message.dropOff =
      object.dropOff !== undefined && object.dropOff !== null
        ? Point.fromPartial(object.dropOff)
        : undefined;
    return message;
  },
};

function createBaseBookCourierResponse(): BookCourierResponse {
  return { success: undefined, error: undefined };
}

export const BookCourierResponse = {
  encode(
    message: BookCourierResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success !== undefined) {
      BookCourierResponse_Success.encode(
        message.success,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      BookCourierResponse_Error.encode(
        message.error,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookCourierResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookCourierResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = BookCourierResponse_Success.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.error = BookCourierResponse_Error.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookCourierResponse {
    return {
      success: isSet(object.success)
        ? BookCourierResponse_Success.fromJSON(object.success)
        : undefined,
      error: isSet(object.error)
        ? BookCourierResponse_Error.fromJSON(object.error)
        : undefined,
    };
  },

  toJSON(message: BookCourierResponse): unknown {
    const obj: any = {};
    message.success !== undefined &&
      (obj.success = message.success
        ? BookCourierResponse_Success.toJSON(message.success)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? BookCourierResponse_Error.toJSON(message.error)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierResponse>, I>>(
    object: I
  ): BookCourierResponse {
    const message = createBaseBookCourierResponse();
    message.success =
      object.success !== undefined && object.success !== null
        ? BookCourierResponse_Success.fromPartial(object.success)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? BookCourierResponse_Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseBookCourierResponse_Error(): BookCourierResponse_Error {
  return { code: 0 };
}

export const BookCourierResponse_Error = {
  encode(
    message: BookCourierResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BookCourierResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookCourierResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookCourierResponse_Error {
    return {
      code: isSet(object.code)
        ? commonCourierErrorCodeFromJSON(object.code)
        : 0,
    };
  },

  toJSON(message: BookCourierResponse_Error): unknown {
    const obj: any = {};
    message.code !== undefined &&
      (obj.code = commonCourierErrorCodeToJSON(message.code));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierResponse_Error>, I>>(
    object: I
  ): BookCourierResponse_Error {
    const message = createBaseBookCourierResponse_Error();
    message.code = object.code ?? 0;
    return message;
  },
};

function createBaseBookCourierResponse_Success(): BookCourierResponse_Success {
  return { id: "" };
}

export const BookCourierResponse_Success = {
  encode(
    message: BookCourierResponse_Success,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BookCourierResponse_Success {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookCourierResponse_Success();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookCourierResponse_Success {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: BookCourierResponse_Success): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierResponse_Success>, I>>(
    object: I
  ): BookCourierResponse_Success {
    const message = createBaseBookCourierResponse_Success();
    message.id = object.id ?? "";
    return message;
  },
};

export type ExpressService = typeof ExpressService;
export const ExpressService = {
  getCourierPrices: {
    path: "/Express/GetCourierPrices",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: GetCourierPricesRequest) =>
      Buffer.from(GetCourierPricesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      GetCourierPricesRequest.decode(value),
    responseSerialize: (value: GetCourierPricesResponse) =>
      Buffer.from(GetCourierPricesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetCourierPricesResponse.decode(value),
  },
  bookCourier: {
    path: "/Express/BookCourier",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BookCourierRequest) =>
      Buffer.from(BookCourierRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BookCourierRequest.decode(value),
    responseSerialize: (value: BookCourierResponse) =>
      Buffer.from(BookCourierResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => BookCourierResponse.decode(value),
  },
} as const;

export interface ExpressServer extends UntypedServiceImplementation {
  getCourierPrices: handleServerStreamingCall<
    GetCourierPricesRequest,
    GetCourierPricesResponse
  >;
  bookCourier: handleUnaryCall<BookCourierRequest, BookCourierResponse>;
}

export interface ExpressClient extends Client {
  getCourierPrices(
    request: GetCourierPricesRequest,
    options?: Partial<CallOptions>
  ): ClientReadableStream<GetCourierPricesResponse>;
  getCourierPrices(
    request: GetCourierPricesRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ): ClientReadableStream<GetCourierPricesResponse>;
  bookCourier(
    request: BookCourierRequest,
    callback: (
      error: ServiceError | null,
      response: BookCourierResponse
    ) => void
  ): ClientUnaryCall;
  bookCourier(
    request: BookCourierRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: BookCourierResponse
    ) => void
  ): ClientUnaryCall;
  bookCourier(
    request: BookCourierRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: BookCourierResponse
    ) => void
  ): ClientUnaryCall;
}

export const ExpressClient = makeGenericClientConstructor(
  ExpressService,
  "Express"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): ExpressClient;
  service: typeof ExpressService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
