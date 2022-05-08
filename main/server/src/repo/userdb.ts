import { NewUser, User } from '../model/user';
import { Db } from '../model/db';

class InMemUserDb implements Db <number, NewUser, User> {

  inMemUsers: Array<User> = [];

  save(t: NewUser): User {
    const user =
      { id: new Date().getMilliseconds()
      , firstName: t.firstName
      , lastName: t.lastName
      , address: t.address
      , mobileNumber: t.mobileNumber
      , birthday: t.birthday
      };
    this.inMemUsers.push(user);
    return user;
  }

  update(t: User): void {
    const initUsers = this.inMemUsers.filter(u => u.id !== t.id);
    initUsers.push(t);
    this.inMemUsers = initUsers;
  }

  get(id: number): User | undefined {
    return this.inMemUsers.find(u => u.id == id);
  }

  list(): Array<User> {
    return this.inMemUsers;
  }
}

export {
  InMemUserDb
}

// https://github.com/agreatfool/grpc_tools_node_protoc_ts
// https://github.com/CatsMiaow/node-grpc-typescript
// https://github.com/stephenh/ts-proto
//https://www.typescriptlang.org/docs/handbook/2/modules.html