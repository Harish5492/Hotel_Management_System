import { Dialect } from 'sequelize';

export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string | number;
  dialect?: Dialect; // Use Sequelize's Dialect type
}

export interface IDatabaseConfig {
  dev: IDatabaseConfigAttributes;
}
