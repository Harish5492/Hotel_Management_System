import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { TEST_REPOSITORY, USER_REPOSITORY } from '../../constant';
import { Test, User } from './entities';
@Module({
  providers: [
    ...databaseProviders,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
    {
      provide: TEST_REPOSITORY,
      useValue: Test,
    },
  ],
  exports: [...databaseProviders, USER_REPOSITORY, TEST_REPOSITORY],
})
export class DatabaseModule {}
