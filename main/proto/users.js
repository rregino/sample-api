"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersClient = exports.UsersService = exports.ListUsersResponse = exports.CreateUserResponse = exports.CreateUserRequest = exports.User = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const grpc_js_1 = require("@grpc/grpc-js");
const _m0 = __importStar(require("protobufjs/minimal"));
const timestamp_1 = require("./google/protobuf/timestamp");
const empty_1 = require("./google/protobuf/empty");
function createBaseUser() {
    return {
        id: 0,
        firstName: "",
        lastName: "",
        mobileNumber: "",
        address: "",
        birthday: undefined,
    };
}
exports.User = {
    encode(message, writer = _m0.Writer.create()) {
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
            timestamp_1.Timestamp.encode(toTimestamp(message.birthday), writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.birthday = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
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
    toJSON(message) {
        const obj = {};
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
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseUser();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : 0;
        message.firstName = (_b = object.firstName) !== null && _b !== void 0 ? _b : "";
        message.lastName = (_c = object.lastName) !== null && _c !== void 0 ? _c : "";
        message.mobileNumber = (_d = object.mobileNumber) !== null && _d !== void 0 ? _d : "";
        message.address = (_e = object.address) !== null && _e !== void 0 ? _e : "";
        message.birthday = (_f = object.birthday) !== null && _f !== void 0 ? _f : undefined;
        return message;
    },
};
function createBaseCreateUserRequest() {
    return {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        address: "",
        birthday: undefined,
    };
}
exports.CreateUserRequest = {
    encode(message, writer = _m0.Writer.create()) {
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
            timestamp_1.Timestamp.encode(toTimestamp(message.birthday), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.birthday = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
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
    toJSON(message) {
        const obj = {};
        message.firstName !== undefined && (obj.firstName = message.firstName);
        message.lastName !== undefined && (obj.lastName = message.lastName);
        message.mobileNumber !== undefined &&
            (obj.mobileNumber = message.mobileNumber);
        message.address !== undefined && (obj.address = message.address);
        message.birthday !== undefined &&
            (obj.birthday = message.birthday.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseCreateUserRequest();
        message.firstName = (_a = object.firstName) !== null && _a !== void 0 ? _a : "";
        message.lastName = (_b = object.lastName) !== null && _b !== void 0 ? _b : "";
        message.mobileNumber = (_c = object.mobileNumber) !== null && _c !== void 0 ? _c : "";
        message.address = (_d = object.address) !== null && _d !== void 0 ? _d : "";
        message.birthday = (_e = object.birthday) !== null && _e !== void 0 ? _e : undefined;
        return message;
    },
};
function createBaseCreateUserResponse() {
    return { user: undefined };
}
exports.CreateUserResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.user !== undefined) {
            exports.User.encode(message.user, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateUserResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = exports.User.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            user: isSet(object.user) ? exports.User.fromJSON(object.user) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.user !== undefined &&
            (obj.user = message.user ? exports.User.toJSON(message.user) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseCreateUserResponse();
        message.user =
            object.user !== undefined && object.user !== null
                ? exports.User.fromPartial(object.user)
                : undefined;
        return message;
    },
};
function createBaseListUsersResponse() {
    return { users: [] };
}
exports.ListUsersResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.users) {
            exports.User.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListUsersResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.users.push(exports.User.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            users: Array.isArray(object === null || object === void 0 ? void 0 : object.users)
                ? object.users.map((e) => exports.User.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.users) {
            obj.users = message.users.map((e) => (e ? exports.User.toJSON(e) : undefined));
        }
        else {
            obj.users = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseListUsersResponse();
        message.users = ((_a = object.users) === null || _a === void 0 ? void 0 : _a.map((e) => exports.User.fromPartial(e))) || [];
        return message;
    },
};
exports.UsersService = {
    createUser: {
        path: "/Users/CreateUser",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.CreateUserRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.CreateUserRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.CreateUserResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.CreateUserResponse.decode(value),
    },
    listUsers: {
        path: "/Users/ListUsers",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(empty_1.Empty.encode(value).finish()),
        requestDeserialize: (value) => empty_1.Empty.decode(value),
        responseSerialize: (value) => Buffer.from(exports.ListUsersResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.ListUsersResponse.decode(value),
    },
};
exports.UsersClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.UsersService, "Users");
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
if (_m0.util.Long !== long_1.default) {
    _m0.util.Long = long_1.default;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
