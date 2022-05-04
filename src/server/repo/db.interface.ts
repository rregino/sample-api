
import { NewUser, User } from './../user/user.interface';

interface Db <Id, Type>{
  save(t: Type): void
  update(t: Type): void
  get(id: Id): Type | undefined
  list(): Array<Type>
}

export class UserDb implements Db <number, User> {

  inMemUsers: Array<User> = [];

  save(t: NewUser): void {
    const user =
      { id: new Date().getMilliseconds()
      , firstName: t.firstName
      , lastName: t.lastName
      , address: t.address
      };
      this.inMemUsers.push(user);
  }

  update(t: User): void {
    const initUsers = this.inMemUsers.filter(u => u.id !== t.id);
    this.inMemUsers.push(t);
  }

  get(id: number): User | undefined {
    return this.inMemUsers.find(u => u.id !== id);
  }

  list(): Array<User> {
    return this.inMemUsers;
  }
}

// const userDb = new UserDb();

// userDb.save({firstName: 'Harry', lastName: 'Potter', address: 'Hogwarts'});
// userDb.update({id: 1, firstName: 'Harry', lastName: 'Potter', address: 'Hogwarts'});

// https://github.com/agreatfool/grpc_tools_node_protoc_ts
// https://github.com/CatsMiaow/node-grpc-typescript
// https://github.com/stephenh/ts-proto
//https://www.typescriptlang.org/docs/handbook/2/modules.html