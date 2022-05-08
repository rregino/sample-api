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
      const { firstName, lastName, mobileNumber, address, birthday } = call.request;
      const newUser = this.svc.createUser({ firstName, lastName, mobileNumber, address, birthday });
      const response: PU.CreateUserResponse = { user: newUser };
      callback(null, response);
    },

    listUsers: (call: ServerUnaryCall<P.Empty, PU.ListUsersResponse>, callback: sendUnaryData<PU.ListUsersResponse>): void => {
      const response: PU.ListUsersResponse = { users: this.svc.listUsers() };
      callback(null, response);
    }
  }
}

export {
  UsersServerImpl
}