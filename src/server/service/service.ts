import { Db } from "../repo/db";
import { NewUser, User } from "../user/user.interface";

export class Service {

  userDb: Db<number, NewUser, User>;

  constructor(userDb: Db<number, NewUser, User>) {
    this.userDb = userDb;
  }

  createUser(user: NewUser): User {
    return this.userDb.save(user);
  }

  listUsers(): Array<User> {
    return this.userDb.list();
  }

}