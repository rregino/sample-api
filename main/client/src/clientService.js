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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const PU = __importStar(require("../../proto/users"));
const grpc_js_1 = require("@grpc/grpc-js");
class ClientService {
    constructor() {
        this.client = new PU.UsersClient('localhost:7000', grpc_js_1.credentials.createInsecure());
    }
    createUser(request) {
        return new Promise((resolve, reject) => {
            this.client.createUser(request, (error, response) => resolve(response));
        });
    }
    listUsers() {
        return new Promise((resolve, reject) => {
            this.client.listUsers({}, (error, response) => resolve(response));
        });
    }
}
exports.ClientService = ClientService;
