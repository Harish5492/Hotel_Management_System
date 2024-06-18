import * as dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' });

export const ENVIROMENT_MANAGER = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  SERVICE_HOST: process.env.SERVICE_HOST,
  SERVICE_PORT: process.env.SERVICE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },

  ENCDECRYPT_KEY: process.env.ENCDECRYPT_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MYSQL: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME,
  },
  REDIS: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  RABBIT_MQ_CONNECTION_URL: process.env.RABBIT_MQ_CONNECTION_URL,
};
