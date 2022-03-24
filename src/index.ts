import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import { Options } from 'graphql-yoga';
import app from './app';
import dbConnection from './orm';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHQL_ENDPOINT: string = '/graphql';

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  cors: {
    credentials: true,
    origin: true,
  },
};

const handleAppStart = () => console.log(`Server is listening on ${PORT}`);

dbConnection
  .initialize()
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((error) => console.log(error));
