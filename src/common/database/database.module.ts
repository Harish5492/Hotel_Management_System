import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { TEST_REPOSITORY, USER_REPOSITORY } from '../../constant';
import { Tests, User } from './entities';
@Module({
  providers: [
    ...databaseProviders,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
    {
      provide: TEST_REPOSITORY,
      useValue: Tests,
    },
  ],
  exports: [...databaseProviders, USER_REPOSITORY, TEST_REPOSITORY],
})
export class DatabaseModule {}
