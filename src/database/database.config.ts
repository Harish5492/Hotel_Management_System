import { IDatabaseConfig } from './database.interface';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // Load environment variables from .env file

export const databaseConfig: IDatabaseConfig = {
  dev: {
    username: 'harish',
    password: 'Harish@5492',
    database: 'HMS', // Add the database name here
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql', // Ensure the dialect is set correctly
  },
};
