import * as PU from "../../proto/users"
import { credentials } from "@grpc/grpc-js"

class ClientService {
  private readonly client: PU.UsersClient = new PU.UsersClient('localhost:7000', credentials.createInsecure());

  createUser(request: PU.CreateUserRequest): Promise<PU.CreateUserResponse> {
    return new Promise((resolve, reject) => {
      this.client.createUser(request, (error, response) => resolve(response));
    });
  }

  listUsers(): Promise<PU.ListUsersResponse> {
    return new Promise((resolve, reject) => {
      this.client.listUsers({}, (error, response) => resolve(response));
    })
  }
}

export {
  ClientService
}
