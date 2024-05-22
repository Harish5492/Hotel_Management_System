import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from './database.interface';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.././.env' }); // Load environment variables from .env file

export const databaseConfig: IDatabaseConfig = {
  dev: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT as Dialect,
  },
  stage: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT as Dialect,
  },
  prod: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT as Dialect,
  },
};
