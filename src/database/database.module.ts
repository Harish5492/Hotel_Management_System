// import { databaseProviders } from './database.provider';
// import { Module } from '@nestjs/common';

// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity'; // Adjust the path as necessary
import { USER_REPOSITORY } from 'src/constant';
console.log('inside the database module');
@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useValue: User, // Assuming User is the repository or entity
    },
  ],
  exports: [USER_REPOSITORY],
})
export class DatabaseModule {}
