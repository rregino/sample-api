/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { BrowserHeaders } from "browser-headers";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  birthday?: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  birthday?: Date;
}

export interface CreateUserResponse {
  user?: User;
}

export interface ListUsersResponse {
  users: User[];
}

function createBaseUser(): User {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    birthday: undefined,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.firstName !== "") {
      writer.uint32(18).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(26).string(message.lastName);
    }
    if (message.mobileNumber !== "") {
      writer.uint32(34).string(message.mobileNumber);
    }
    if (message.address !== "") {
      writer.uint32(42).string(message.address);
    }
    if (message.birthday !== undefined) {
      Timestamp.encode(
        toTimestamp(message.birthday),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.firstName = reader.string();
          break;
        case 3:
          message.lastName = reader.string();
          break;
        case 4:
          message.mobileNumber = reader.string();
          break;
        case 5:
          message.address = reader.string();
          break;
        case 6:
          message.birthday = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      mobileNumber: isSet(object.mobileNumber)
        ? String(object.mobileNumber)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      birthday: isSet(object.birthday)
        ? fromJsonTimestamp(object.birthday)
        : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.mobileNumber !== undefined &&
      (obj.mobileNumber = message.mobileNumber);
    message.address !== undefined && (obj.address = message.address);
    message.birthday !== undefined &&
      (obj.birthday = message.birthday.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.mobileNumber = object.mobileNumber ?? "";
    message.address = object.address ?? "";
    message.birthday = object.birthday ?? undefined;
    return message;
  },
};

function createBaseCreateUserRequest(): CreateUserRequest {
  return {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    birthday: undefined,
  };
}

export const CreateUserRequest = {
  encode(
    message: CreateUserRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(18).string(message.lastName);
    }
    if (message.mobileNumber !== "") {
      writer.uint32(26).string(message.mobileNumber);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.birthday !== undefined) {
      Timestamp.encode(
        toTimestamp(message.birthday),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.firstName = reader.string();
          break;
        case 2:
          message.lastName = reader.string();
          break;
        case 3:
          message.mobileNumber = reader.string();
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.birthday = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      firstName: isSet(object.firstName) ? String(object.firstName) : "",
      lastName: isSet(object.lastName) ? String(object.lastName) : "",
      mobileNumber: isSet(object.mobileNumber)
        ? String(object.mobileNumber)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      birthday: isSet(object.birthday)
        ? fromJsonTimestamp(object.birthday)
        : undefined,
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.mobileNumber !== undefined &&
      (obj.mobileNumber = message.mobileNumber);
    message.address !== undefined && (obj.address = message.address);
    message.birthday !== undefined &&
      (obj.birthday = message.birthday.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(
    object: I
  ): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.mobileNumber = object.mobileNumber ?? "";
    message.address = object.address ?? "";
    message.birthday = object.birthday ?? undefined;
    return message;
  },
};

function createBaseCreateUserResponse(): CreateUserResponse {
  return { user: undefined };
}

export const CreateUserResponse = {
  encode(
    message: CreateUserResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateUserResponse {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: CreateUserResponse): unknown {
    const obj: any = {};
    message.user !== undefined &&
      (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateUserResponse>, I>>(
    object: I
  ): CreateUserResponse {
    const message = createBaseCreateUserResponse();
    message.user =
      object.user !== undefined && object.user !== null
        ? User.fromPartial(object.user)
        : undefined;
    return message;
  },
};

function createBaseListUsersResponse(): ListUsersResponse {
  return { users: [] };
}

export const ListUsersResponse = {
  encode(
    message: ListUsersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListUsersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUsersResponse {
    return {
      users: Array.isArray(object?.users)
        ? object.users.map((e: any) => User.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListUsersResponse): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUsersResponse>, I>>(
    object: I
  ): ListUsersResponse {
    const message = createBaseListUsersResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

export interface Users {
  CreateUser(
    request: DeepPartial<CreateUserRequest>,
    metadata?: grpc.Metadata
  ): Promise<CreateUserResponse>;
  ListUsers(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata
  ): Promise<ListUsersResponse>;
}

export class UsersClientImpl implements Users {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateUser = this.CreateUser.bind(this);
    this.ListUsers = this.ListUsers.bind(this);
  }

  CreateUser(
    request: DeepPartial<CreateUserRequest>,
    metadata?: grpc.Metadata
  ): Promise<CreateUserResponse> {
    return this.rpc.unary(
      UsersCreateUserDesc,
      CreateUserRequest.fromPartial(request),
      metadata
    );
  }

  ListUsers(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata
  ): Promise<ListUsersResponse> {
    return this.rpc.unary(
      UsersListUsersDesc,
      Empty.fromPartial(request),
      metadata
    );
  }
}

export const UsersDesc = {
  serviceName: "Users",
};

export const UsersCreateUserDesc: UnaryMethodDefinitionish = {
  methodName: "CreateUser",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CreateUserResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const UsersListUsersDesc: UnaryMethodDefinitionish = {
  methodName: "ListUsers",
  service: UsersDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...ListUsersResponse.decode(data),
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
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
