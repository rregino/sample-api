// https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

/**
 * Required External Modules
 */

 import * as dotenv from 'dotenv';
//  import express from 'express';
//  import cors from 'cors';
//  import helmet from 'helmet';

 import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UsersServerImpl, UsersService } from "./impl/usersServerImpl";
import { Service } from "./service/service";
import { InMemUserDb } from "./repo/userdb.class";

// import { itemsRouter } from './old-items/items.router';
import { NewUser, User } from "./user/user.interface";
import { Db } from './repo/db.interface';

dotenv.config();

/**
 * App Variables
 */

if(!process.env.PORT) {
  process.exit(1);
}

const inMemUserDb: Db<number, NewUser, User> = new InMemUserDb();
const userSvc = new Service(inMemUserDb);
const usersServerImpl = new UsersServerImpl(userSvc);
const PORT: number = parseInt(process.env.PORT as string, 10);

const server = new Server();
server.addService(UsersService, usersServerImpl.Impl);

server.bindAsync(`0.0.0.0:${PORT}`, ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
  if(err) {
    console.error(err);
    return err;
  }

  console.log(`Listening on port ${port}`);
  server.start();
})

// const app = express();

/**
 *  App Configuration
 */

// app.use(helmet()); //response headers
// app.use(cors());
// app.use(express.json()); //parase incoming requests with json payloads
// app.use('/api/menu/items', itemsRouter);

/**
 * Server Activation
 */

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });