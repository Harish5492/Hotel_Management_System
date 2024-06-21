import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { USER_REPOSITORY } from '../../constant';
import { User } from './entities/user.entity';
@Module({
  providers: [
    ...databaseProviders,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
  ],
  exports: [...databaseProviders, USER_REPOSITORY],
})
export class DatabaseModule {}
