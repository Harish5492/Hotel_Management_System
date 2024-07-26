import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { SEQUELIZE } from '../../constant';
import { User, Tests, Treatment } from './entities';
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const config = databaseConfig.dev;

      // Ensure the config is correctly typed
      const sequelize = new Sequelize({
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        dialect: config.dialect,
      });

      // Add models to the Sequelize instance
      // sequelize.addModels([User, Tests, Treatment]);
      sequelize.addModels([__dirname + '/entities/**/*.entity{.ts,.js}']);
      console.log('Models added to Sequelize:', sequelize.models);

      // Synchronize models with the database
      if (process.env.NODE_ENV !== 'prod') {
        try {
          await sequelize.sync({
            alter: true,
          });
          console.log('Database synchronized successfully.');
        } catch (error) {
          console.error('Database synchronization failed:', error);
        }
      }

      return sequelize;
    },
  },
];
