// https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

/**
 * Required External Modules
 */

 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import { itemsRouter } from './items/items.router';

 import { UserDb } from './repo/db.interface';


 dotenv.config();

/**
 * App Variables
 */

if(!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet()); //response headers
app.use(cors());
app.use(express.json()); //parase incoming requests with json payloads
app.use('/api/menu/items', itemsRouter);

new UserDb();

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});