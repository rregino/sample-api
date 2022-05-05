import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { Empty } from "../../proto/google/protobuf/empty";
import { CreateUserRequest, CreateUserResponse, ListUsersResponse, UsersServer, UsersService } from "../../proto/users";
import { Service } from '../service/service';

class UsersServerImpl {

  svc: Service;

  constructor(s: Service) {
    this.svc = s;
  }

  public Impl: UsersServer = {
    createUser: (call: ServerUnaryCall<CreateUserRequest, CreateUserResponse>, callback: sendUnaryData<CreateUserResponse>): void => {
      const { firstName, lastName, mobileNumber, address, birthday } = call.request;
      const newUser = this.svc.createUser({ firstName, lastName, mobileNumber, address, birthday });
      const response: CreateUserResponse = { user: newUser };
      callback(null, response);
    },

    listUsers: (call: ServerUnaryCall<Empty, ListUsersResponse>, callback: sendUnaryData<ListUsersResponse>): void => {
      const response: ListUsersResponse = { users: this.svc.listUsers() };
      callback(null, response);
    }

  }
}

export {
  UsersServerImpl,
  UsersService
}

