import { Dialect } from 'sequelize/types';

export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect; // Use Sequelize's Dialect type
}

export interface IDatabaseConfig {
  dev: IDatabaseConfigAttributes;
}
