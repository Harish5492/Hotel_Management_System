import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { SEQUELIZE, DEVELOPMENT, STAGE, PRODUCTION } from '../constant';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.dev;
          break;
        case STAGE:
          config = databaseConfig.stage;
          break;
        case PRODUCTION:
          config = databaseConfig.prod;
          break;
        default:
          config = databaseConfig.dev;
      }

      //seed files

      const sequelize = new Sequelize(config);
      if (process.env.NODE_ENV !== 'prod') {
        sequelize.addModels([__dirname + '/entities/**/*.entity{.ts,.js}']);
        await sequelize.sync({
          alter: true,
          // force: true,
        });
      }

      return sequelize;
    },
  },
];
