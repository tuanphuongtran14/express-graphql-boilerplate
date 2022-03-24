import 'reflect-metadata';
import { toInteger } from 'lodash';
import { DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['entities/**/*.*'],
  host: process.env.DB_HOST,
  port: toInteger(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: [],
  subscribers: [],
};

export default ormConfig;
