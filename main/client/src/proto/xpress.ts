/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { BrowserHeaders } from "browser-headers";
import { share } from "rxjs/operators";

export const protobufPackage = "";

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

export enum BookingStatus {
  NO_STATUS = 0,
  REQUESTED = 1,
  CANCELED = 2,
  UNRECOGNIZED = -1,
}

export function bookingStatusFromJSON(object: any): BookingStatus {
  switch (object) {
    case 0:
    case "NO_STATUS":
      return BookingStatus.NO_STATUS;
    case 1:
    case "REQUESTED":
      return BookingStatus.REQUESTED;
    case 2:
    case "CANCELED":
      return BookingStatus.CANCELED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BookingStatus.UNRECOGNIZED;
  }
}

export function bookingStatusToJSON(object: BookingStatus): string {
  switch (object) {
    case BookingStatus.NO_STATUS:
      return "NO_STATUS";
    case BookingStatus.REQUESTED:
      return "REQUESTED";
    case BookingStatus.CANCELED:
      return "CANCELED";
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

export interface Booking {
  id: string;
  origin?: Point;
  destination?: Point;
  courier: CourierType;
  status: BookingStatus;
}

export interface UserBooking {
  userId: string;
  booking?: Booking;
}

export interface ListBookingsFilter {
  userId: string;
  statuses: BookingStatus[];
}

export interface GetAvailableCouriersRequest {
  pickUp?: Point | undefined;
  userId: string | undefined;
  dropOff?: Point;
}

export interface GetAvailableCouriersResponse {
  success?: GetAvailableCouriersResponse_Success | undefined;
  error?: GetAvailableCouriersResponse_Error | undefined;
}

export interface GetAvailableCouriersResponse_Error {
  /** CommonCourierErrorCode code = 1; */
  errorMessage: string;
}

export interface GetAvailableCouriersResponse_Success {
  id: string;
  courier: CourierType;
  price: number;
}

export interface BookCourierRequest {
  id: string;
}

export interface BookCourierResponse {
  success?: BookCourierResponse_Success | undefined;
  error?: BookCourierResponse_Error | undefined;
}

export interface BookCourierResponse_Error {
  /** CommonCourierErrorCode code = 1; */
  errorMessage: string;
}

export interface BookCourierResponse_Success {
  booking?: Booking;
}

export interface CancelBookingRequest {
  id: string;
}

export interface CancelBookingResponse {
  success?: CancelBookingResponse_Success | undefined;
  error?: CancelBookingResponse_Error | undefined;
}

export interface CancelBookingResponse_Error {
  /** CommonCourierErrorCode code = 1; */
  errorMessage: string;
}

export interface CancelBookingResponse_Success {
  booking?: Booking;
}

export interface ListBookingsRequest {
  filter?: ListBookingsFilter;
}

export interface ListBookingsResponse {
  bookings: Booking[];
}

export interface GetBookingRequest {
  id: string;
}

export interface GetBookingResponse {
  booking?: Booking;
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

function createBaseBooking(): Booking {
  return {
    id: "",
    origin: undefined,
    destination: undefined,
    courier: 0,
    status: 0,
  };
}

export const Booking = {
  encode(
    message: Booking,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.origin !== undefined) {
      Point.encode(message.origin, writer.uint32(18).fork()).ldelim();
    }
    if (message.destination !== undefined) {
      Point.encode(message.destination, writer.uint32(26).fork()).ldelim();
    }
    if (message.courier !== 0) {
      writer.uint32(32).int32(message.courier);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Booking {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBooking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.origin = Point.decode(reader, reader.uint32());
          break;
        case 3:
          message.destination = Point.decode(reader, reader.uint32());
          break;
        case 4:
          message.courier = reader.int32() as any;
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Booking {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      origin: isSet(object.origin) ? Point.fromJSON(object.origin) : undefined,
      destination: isSet(object.destination)
        ? Point.fromJSON(object.destination)
        : undefined,
      courier: isSet(object.courier) ? courierTypeFromJSON(object.courier) : 0,
      status: isSet(object.status) ? bookingStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Booking): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.origin !== undefined &&
      (obj.origin = message.origin ? Point.toJSON(message.origin) : undefined);
    message.destination !== undefined &&
      (obj.destination = message.destination
        ? Point.toJSON(message.destination)
        : undefined);
    message.courier !== undefined &&
      (obj.courier = courierTypeToJSON(message.courier));
    message.status !== undefined &&
      (obj.status = bookingStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Booking>, I>>(object: I): Booking {
    const message = createBaseBooking();
    message.id = object.id ?? "";
    message.origin =
      object.origin !== undefined && object.origin !== null
        ? Point.fromPartial(object.origin)
        : undefined;
    message.destination =
      object.destination !== undefined && object.destination !== null
        ? Point.fromPartial(object.destination)
        : undefined;
    message.courier = object.courier ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseUserBooking(): UserBooking {
  return { userId: "", booking: undefined };
}

export const UserBooking = {
  encode(
    message: UserBooking,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.booking !== undefined) {
      Booking.encode(message.booking, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserBooking {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserBooking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.booking = Booking.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserBooking {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      booking: isSet(object.booking)
        ? Booking.fromJSON(object.booking)
        : undefined,
    };
  },

  toJSON(message: UserBooking): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.booking !== undefined &&
      (obj.booking = message.booking
        ? Booking.toJSON(message.booking)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserBooking>, I>>(
    object: I
  ): UserBooking {
    const message = createBaseUserBooking();
    message.userId = object.userId ?? "";
    message.booking =
      object.booking !== undefined && object.booking !== null
        ? Booking.fromPartial(object.booking)
        : undefined;
    return message;
  },
};

function createBaseListBookingsFilter(): ListBookingsFilter {
  return { userId: "", statuses: [] };
}

export const ListBookingsFilter = {
  encode(
    message: ListBookingsFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    writer.uint32(18).fork();
    for (const v of message.statuses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBookingsFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListBookingsFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses.push(reader.int32() as any);
            }
          } else {
            message.statuses.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListBookingsFilter {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      statuses: Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => bookingStatusFromJSON(e))
        : [],
    };
  },

  toJSON(message: ListBookingsFilter): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.statuses) {
      obj.statuses = message.statuses.map((e) => bookingStatusToJSON(e));
    } else {
      obj.statuses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListBookingsFilter>, I>>(
    object: I
  ): ListBookingsFilter {
    const message = createBaseListBookingsFilter();
    message.userId = object.userId ?? "";
    message.statuses = object.statuses?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetAvailableCouriersRequest(): GetAvailableCouriersRequest {
  return { pickUp: undefined, userId: undefined, dropOff: undefined };
}

export const GetAvailableCouriersRequest = {
  encode(
    message: GetAvailableCouriersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pickUp !== undefined) {
      Point.encode(message.pickUp, writer.uint32(10).fork()).ldelim();
    }
    if (message.userId !== undefined) {
      writer.uint32(26).string(message.userId);
    }
    if (message.dropOff !== undefined) {
      Point.encode(message.dropOff, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAvailableCouriersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableCouriersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pickUp = Point.decode(reader, reader.uint32());
          break;
        case 3:
          message.userId = reader.string();
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

  fromJSON(object: any): GetAvailableCouriersRequest {
    return {
      pickUp: isSet(object.pickUp) ? Point.fromJSON(object.pickUp) : undefined,
      userId: isSet(object.userId) ? String(object.userId) : undefined,
      dropOff: isSet(object.dropOff)
        ? Point.fromJSON(object.dropOff)
        : undefined,
    };
  },

  toJSON(message: GetAvailableCouriersRequest): unknown {
    const obj: any = {};
    message.pickUp !== undefined &&
      (obj.pickUp = message.pickUp ? Point.toJSON(message.pickUp) : undefined);
    message.userId !== undefined && (obj.userId = message.userId);
    message.dropOff !== undefined &&
      (obj.dropOff = message.dropOff
        ? Point.toJSON(message.dropOff)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAvailableCouriersRequest>, I>>(
    object: I
  ): GetAvailableCouriersRequest {
    const message = createBaseGetAvailableCouriersRequest();
    message.pickUp =
      object.pickUp !== undefined && object.pickUp !== null
        ? Point.fromPartial(object.pickUp)
        : undefined;
    message.userId = object.userId ?? undefined;
    message.dropOff =
      object.dropOff !== undefined && object.dropOff !== null
        ? Point.fromPartial(object.dropOff)
        : undefined;
    return message;
  },
};

function createBaseGetAvailableCouriersResponse(): GetAvailableCouriersResponse {
  return { success: undefined, error: undefined };
}

export const GetAvailableCouriersResponse = {
  encode(
    message: GetAvailableCouriersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success !== undefined) {
      GetAvailableCouriersResponse_Success.encode(
        message.success,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      GetAvailableCouriersResponse_Error.encode(
        message.error,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAvailableCouriersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableCouriersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = GetAvailableCouriersResponse_Success.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.error = GetAvailableCouriersResponse_Error.decode(
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

  fromJSON(object: any): GetAvailableCouriersResponse {
    return {
      success: isSet(object.success)
        ? GetAvailableCouriersResponse_Success.fromJSON(object.success)
        : undefined,
      error: isSet(object.error)
        ? GetAvailableCouriersResponse_Error.fromJSON(object.error)
        : undefined,
    };
  },

  toJSON(message: GetAvailableCouriersResponse): unknown {
    const obj: any = {};
    message.success !== undefined &&
      (obj.success = message.success
        ? GetAvailableCouriersResponse_Success.toJSON(message.success)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? GetAvailableCouriersResponse_Error.toJSON(message.error)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAvailableCouriersResponse>, I>>(
    object: I
  ): GetAvailableCouriersResponse {
    const message = createBaseGetAvailableCouriersResponse();
    message.success =
      object.success !== undefined && object.success !== null
        ? GetAvailableCouriersResponse_Success.fromPartial(object.success)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? GetAvailableCouriersResponse_Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseGetAvailableCouriersResponse_Error(): GetAvailableCouriersResponse_Error {
  return { errorMessage: "" };
}

export const GetAvailableCouriersResponse_Error = {
  encode(
    message: GetAvailableCouriersResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.errorMessage !== "") {
      writer.uint32(10).string(message.errorMessage);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAvailableCouriersResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableCouriersResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.errorMessage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAvailableCouriersResponse_Error {
    return {
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
    };
  },

  toJSON(message: GetAvailableCouriersResponse_Error): unknown {
    const obj: any = {};
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetAvailableCouriersResponse_Error>, I>
  >(object: I): GetAvailableCouriersResponse_Error {
    const message = createBaseGetAvailableCouriersResponse_Error();
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

function createBaseGetAvailableCouriersResponse_Success(): GetAvailableCouriersResponse_Success {
  return { id: "", courier: 0, price: 0 };
}

export const GetAvailableCouriersResponse_Success = {
  encode(
    message: GetAvailableCouriersResponse_Success,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
  ): GetAvailableCouriersResponse_Success {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableCouriersResponse_Success();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
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

  fromJSON(object: any): GetAvailableCouriersResponse_Success {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      courier: isSet(object.courier) ? courierTypeFromJSON(object.courier) : 0,
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: GetAvailableCouriersResponse_Success): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.courier !== undefined &&
      (obj.courier = courierTypeToJSON(message.courier));
    message.price !== undefined && (obj.price = message.price);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetAvailableCouriersResponse_Success>, I>
  >(object: I): GetAvailableCouriersResponse_Success {
    const message = createBaseGetAvailableCouriersResponse_Success();
    message.id = object.id ?? "";
    message.courier = object.courier ?? 0;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseBookCourierRequest(): BookCourierRequest {
  return { id: "" };
}

export const BookCourierRequest = {
  encode(
    message: BookCourierRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
          message.id = reader.string();
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
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: BookCourierRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierRequest>, I>>(
    object: I
  ): BookCourierRequest {
    const message = createBaseBookCourierRequest();
    message.id = object.id ?? "";
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
  return { errorMessage: "" };
}

export const BookCourierResponse_Error = {
  encode(
    message: BookCourierResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.errorMessage !== "") {
      writer.uint32(10).string(message.errorMessage);
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
          message.errorMessage = reader.string();
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
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
    };
  },

  toJSON(message: BookCourierResponse_Error): unknown {
    const obj: any = {};
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierResponse_Error>, I>>(
    object: I
  ): BookCourierResponse_Error {
    const message = createBaseBookCourierResponse_Error();
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

function createBaseBookCourierResponse_Success(): BookCourierResponse_Success {
  return { booking: undefined };
}

export const BookCourierResponse_Success = {
  encode(
    message: BookCourierResponse_Success,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.booking !== undefined) {
      Booking.encode(message.booking, writer.uint32(10).fork()).ldelim();
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
          message.booking = Booking.decode(reader, reader.uint32());
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
      booking: isSet(object.booking)
        ? Booking.fromJSON(object.booking)
        : undefined,
    };
  },

  toJSON(message: BookCourierResponse_Success): unknown {
    const obj: any = {};
    message.booking !== undefined &&
      (obj.booking = message.booking
        ? Booking.toJSON(message.booking)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookCourierResponse_Success>, I>>(
    object: I
  ): BookCourierResponse_Success {
    const message = createBaseBookCourierResponse_Success();
    message.booking =
      object.booking !== undefined && object.booking !== null
        ? Booking.fromPartial(object.booking)
        : undefined;
    return message;
  },
};

function createBaseCancelBookingRequest(): CancelBookingRequest {
  return { id: "" };
}

export const CancelBookingRequest = {
  encode(
    message: CancelBookingRequest,
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
  ): CancelBookingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelBookingRequest();
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

  fromJSON(object: any): CancelBookingRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: CancelBookingRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelBookingRequest>, I>>(
    object: I
  ): CancelBookingRequest {
    const message = createBaseCancelBookingRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCancelBookingResponse(): CancelBookingResponse {
  return { success: undefined, error: undefined };
}

export const CancelBookingResponse = {
  encode(
    message: CancelBookingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success !== undefined) {
      CancelBookingResponse_Success.encode(
        message.success,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      CancelBookingResponse_Error.encode(
        message.error,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelBookingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelBookingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = CancelBookingResponse_Success.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.error = CancelBookingResponse_Error.decode(
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

  fromJSON(object: any): CancelBookingResponse {
    return {
      success: isSet(object.success)
        ? CancelBookingResponse_Success.fromJSON(object.success)
        : undefined,
      error: isSet(object.error)
        ? CancelBookingResponse_Error.fromJSON(object.error)
        : undefined,
    };
  },

  toJSON(message: CancelBookingResponse): unknown {
    const obj: any = {};
    message.success !== undefined &&
      (obj.success = message.success
        ? CancelBookingResponse_Success.toJSON(message.success)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? CancelBookingResponse_Error.toJSON(message.error)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelBookingResponse>, I>>(
    object: I
  ): CancelBookingResponse {
    const message = createBaseCancelBookingResponse();
    message.success =
      object.success !== undefined && object.success !== null
        ? CancelBookingResponse_Success.fromPartial(object.success)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? CancelBookingResponse_Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseCancelBookingResponse_Error(): CancelBookingResponse_Error {
  return { errorMessage: "" };
}

export const CancelBookingResponse_Error = {
  encode(
    message: CancelBookingResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.errorMessage !== "") {
      writer.uint32(10).string(message.errorMessage);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelBookingResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelBookingResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.errorMessage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelBookingResponse_Error {
    return {
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
    };
  },

  toJSON(message: CancelBookingResponse_Error): unknown {
    const obj: any = {};
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelBookingResponse_Error>, I>>(
    object: I
  ): CancelBookingResponse_Error {
    const message = createBaseCancelBookingResponse_Error();
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

function createBaseCancelBookingResponse_Success(): CancelBookingResponse_Success {
  return { booking: undefined };
}

export const CancelBookingResponse_Success = {
  encode(
    message: CancelBookingResponse_Success,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.booking !== undefined) {
      Booking.encode(message.booking, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelBookingResponse_Success {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelBookingResponse_Success();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.booking = Booking.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelBookingResponse_Success {
    return {
      booking: isSet(object.booking)
        ? Booking.fromJSON(object.booking)
        : undefined,
    };
  },

  toJSON(message: CancelBookingResponse_Success): unknown {
    const obj: any = {};
    message.booking !== undefined &&
      (obj.booking = message.booking
        ? Booking.toJSON(message.booking)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelBookingResponse_Success>, I>>(
    object: I
  ): CancelBookingResponse_Success {
    const message = createBaseCancelBookingResponse_Success();
    message.booking =
      object.booking !== undefined && object.booking !== null
        ? Booking.fromPartial(object.booking)
        : undefined;
    return message;
  },
};

function createBaseListBookingsRequest(): ListBookingsRequest {
  return { filter: undefined };
}

export const ListBookingsRequest = {
  encode(
    message: ListBookingsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.filter !== undefined) {
      ListBookingsFilter.encode(
        message.filter,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBookingsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListBookingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filter = ListBookingsFilter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListBookingsRequest {
    return {
      filter: isSet(object.filter)
        ? ListBookingsFilter.fromJSON(object.filter)
        : undefined,
    };
  },

  toJSON(message: ListBookingsRequest): unknown {
    const obj: any = {};
    message.filter !== undefined &&
      (obj.filter = message.filter
        ? ListBookingsFilter.toJSON(message.filter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListBookingsRequest>, I>>(
    object: I
  ): ListBookingsRequest {
    const message = createBaseListBookingsRequest();
    message.filter =
      object.filter !== undefined && object.filter !== null
        ? ListBookingsFilter.fromPartial(object.filter)
        : undefined;
    return message;
  },
};

function createBaseListBookingsResponse(): ListBookingsResponse {
  return { bookings: [] };
}

export const ListBookingsResponse = {
  encode(
    message: ListBookingsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.bookings) {
      Booking.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListBookingsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListBookingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bookings.push(Booking.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListBookingsResponse {
    return {
      bookings: Array.isArray(object?.bookings)
        ? object.bookings.map((e: any) => Booking.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListBookingsResponse): unknown {
    const obj: any = {};
    if (message.bookings) {
      obj.bookings = message.bookings.map((e) =>
        e ? Booking.toJSON(e) : undefined
      );
    } else {
      obj.bookings = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListBookingsResponse>, I>>(
    object: I
  ): ListBookingsResponse {
    const message = createBaseListBookingsResponse();
    message.bookings =
      object.bookings?.map((e) => Booking.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetBookingRequest(): GetBookingRequest {
  return { id: "" };
}

export const GetBookingRequest = {
  encode(
    message: GetBookingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBookingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBookingRequest();
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

  fromJSON(object: any): GetBookingRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: GetBookingRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBookingRequest>, I>>(
    object: I
  ): GetBookingRequest {
    const message = createBaseGetBookingRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetBookingResponse(): GetBookingResponse {
  return { booking: undefined };
}

export const GetBookingResponse = {
  encode(
    message: GetBookingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.booking !== undefined) {
      Booking.encode(message.booking, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBookingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBookingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.booking = Booking.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBookingResponse {
    return {
      booking: isSet(object.booking)
        ? Booking.fromJSON(object.booking)
        : undefined,
    };
  },

  toJSON(message: GetBookingResponse): unknown {
    const obj: any = {};
    message.booking !== undefined &&
      (obj.booking = message.booking
        ? Booking.toJSON(message.booking)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBookingResponse>, I>>(
    object: I
  ): GetBookingResponse {
    const message = createBaseGetBookingResponse();
    message.booking =
      object.booking !== undefined && object.booking !== null
        ? Booking.fromPartial(object.booking)
        : undefined;
    return message;
  },
};

export interface Xpress {
  GetAvailableCouriers(
    request: DeepPartial<GetAvailableCouriersRequest>,
    metadata?: grpc.Metadata
  ): Observable<GetAvailableCouriersResponse>;
  BookCourier(
    request: DeepPartial<BookCourierRequest>,
    metadata?: grpc.Metadata
  ): Promise<BookCourierResponse>;
  CancelBooking(
    request: DeepPartial<CancelBookingRequest>,
    metadata?: grpc.Metadata
  ): Promise<CancelBookingResponse>;
  ListBookings(
    request: DeepPartial<ListBookingsRequest>,
    metadata?: grpc.Metadata
  ): Promise<ListBookingsResponse>;
  GetBooking(
    request: DeepPartial<GetBookingRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetBookingResponse>;
}

export class XpressClientImpl implements Xpress {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAvailableCouriers = this.GetAvailableCouriers.bind(this);
    this.BookCourier = this.BookCourier.bind(this);
    this.CancelBooking = this.CancelBooking.bind(this);
    this.ListBookings = this.ListBookings.bind(this);
    this.GetBooking = this.GetBooking.bind(this);
  }

  GetAvailableCouriers(
    request: DeepPartial<GetAvailableCouriersRequest>,
    metadata?: grpc.Metadata
  ): Observable<GetAvailableCouriersResponse> {
    return this.rpc.invoke(
      XpressGetAvailableCouriersDesc,
      GetAvailableCouriersRequest.fromPartial(request),
      metadata
    );
  }

  BookCourier(
    request: DeepPartial<BookCourierRequest>,
    metadata?: grpc.Metadata
  ): Promise<BookCourierResponse> {
    return this.rpc.unary(
      XpressBookCourierDesc,
      BookCourierRequest.fromPartial(request),
      metadata
    );
  }

  CancelBooking(
    request: DeepPartial<CancelBookingRequest>,
    metadata?: grpc.Metadata
  ): Promise<CancelBookingResponse> {
    return this.rpc.unary(
      XpressCancelBookingDesc,
      CancelBookingRequest.fromPartial(request),
      metadata
    );
  }

  ListBookings(
    request: DeepPartial<ListBookingsRequest>,
    metadata?: grpc.Metadata
  ): Promise<ListBookingsResponse> {
    return this.rpc.unary(
      XpressListBookingsDesc,
      ListBookingsRequest.fromPartial(request),
      metadata
    );
  }

  GetBooking(
    request: DeepPartial<GetBookingRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetBookingResponse> {
    return this.rpc.unary(
      XpressGetBookingDesc,
      GetBookingRequest.fromPartial(request),
      metadata
    );
  }
}

export const XpressDesc = {
  serviceName: "Xpress",
};

export const XpressGetAvailableCouriersDesc: UnaryMethodDefinitionish = {
  methodName: "GetAvailableCouriers",
  service: XpressDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return GetAvailableCouriersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetAvailableCouriersResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const XpressBookCourierDesc: UnaryMethodDefinitionish = {
  methodName: "BookCourier",
  service: XpressDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BookCourierRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...BookCourierResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const XpressCancelBookingDesc: UnaryMethodDefinitionish = {
  methodName: "CancelBooking",
  service: XpressDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CancelBookingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CancelBookingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const XpressListBookingsDesc: UnaryMethodDefinitionish = {
  methodName: "ListBookings",
  service: XpressDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListBookingsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...ListBookingsResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const XpressGetBookingDesc: UnaryMethodDefinitionish = {
  methodName: "GetBooking",
  service: XpressDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBookingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetBookingResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any> {
    // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
    const upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          transport: this.options.streamingTransport || this.options.transport,
          metadata: maybeCombinedMetadata,
          debug: this.options.debug,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              observer.error(new Error(`Error ${code} ${message}`));
            }
          },
        });
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
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
