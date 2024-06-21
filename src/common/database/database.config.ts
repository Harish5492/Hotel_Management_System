import { IDatabaseConfig } from './database.interface';
import { Dialect } from 'sequelize';
import { EM } from 'src/constant';

export const databaseConfig: IDatabaseConfig = {
  dev: {
    username: EM.MYSQL.DB_USER,
    password: EM.MYSQL.DB_PASS,
    database: EM.MYSQL.DB_NAME, // Add the database name here
    host: EM.MYSQL.DB_HOST,
    port: EM.MYSQL.DB_PORT,
    dialect: EM.MYSQL.DB_DIALECT as Dialect, // Ensure the dialect is set correctly
  },
};
