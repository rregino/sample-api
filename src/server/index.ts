// https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

/**
 * Required External Modules
 */

 import * as dotenv from 'dotenv';
//  import express from 'express';
//  import cors from 'cors';
//  import helmet from 'helmet';

 import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UsersServerImpl } from "./impl/usersServerImpl";
import { Service } from "./service/service";
import { InMemUserDb } from "./repo/userdb";

// import { itemsRouter } from './old-items/items.router';
import { NewUser, User } from "./model/user";
import { Db, SimpleDb } from './model/db';
import { XpressServerImpl } from './impl/xpressServerImpl';
import { BorzoClient } from './client/borzoClient';
import { InMemBookingDb } from './repo/bookingdb';
import { Booking } from './model/booking';
import { LalamoveClient } from './client/lalamoveClient';

dotenv.config();

/**
 * App Variables
 */

if(!process.env.PORT && !process.env.BORZO_API_TOKEN && !process.env.LALAMOVE_API_KEY && !process.env.LALAMOVE_API_SECRET) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const inMemUserDb: Db<number, NewUser, User> = new InMemUserDb();
const inMemBookingDb: SimpleDb<string, Booking> = new InMemBookingDb();
const borzoClient = new BorzoClient(process.env.BORZO_API_TOKEN as string);
const lalamoveClient = new LalamoveClient({ apiKey: process.env.LALAMOVE_API_KEY as string, apiSecret: process.env.LALAMOVE_API_SECRET as string });
const courierClients = [ borzoClient, lalamoveClient ];
const svc = new Service(inMemUserDb, inMemBookingDb, courierClients);

const usersServerImpl = new UsersServerImpl(svc);
const xpressServerImpl = new XpressServerImpl(svc);

const serverImpls = [
  usersServerImpl,
  xpressServerImpl
]

const server = new Server();
serverImpls.map(si => server.addService(si.serviceDefinition, si.Impl));

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

/*
yarn add -D grpc-tools --ignore-scripts
pushd node_modules/grpc-tools
node_modules/.bin/node-pre-gyp install --target_arch=x64
popd
yarn add grpc_tools_node_protoc_ts
yarn add @grpc/grpc-js
*/