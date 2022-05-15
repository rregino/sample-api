import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import * as P from '../../../proto/google/protobuf/empty';
import * as PU from "../../../proto/users";
import { ServerImpl } from '../model/serverImpl';
import { Service } from '../service/service';

class UsersServerImpl implements ServerImpl<PU.UsersService, PU.UsersServer> {
  svc: Service;

  serviceDefinition = PU.UsersService;

  constructor(s: Service) {
    this.svc = s;
  }

  public Impl: PU.UsersServer = {
    createUser: (call: ServerUnaryCall<PU.CreateUserRequest, PU.CreateUserResponse>, callback: sendUnaryData<PU.CreateUserResponse>): void => {
      const newUser = this.svc.createUser(call.request);
      callback(null, { user: newUser });
    },

    listUsers: (call: ServerUnaryCall<P.Empty, PU.ListUsersResponse>, callback: sendUnaryData<PU.ListUsersResponse>): void => {
      callback(null, { users: this.svc.listUsers() });
    },

    getUser: (call: ServerUnaryCall<PU.GetUserRequest, PU.GetUserResponse>, callback: sendUnaryData<PU.GetUserResponse>): void => {
      callback(null, { user: this.svc.getUser(call.request.id) });
    }
  }
}

export {
  UsersServerImpl
}