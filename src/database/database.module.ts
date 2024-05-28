import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { OTP_REPOSITORY, USER_REPOSITORY } from '../constant';
import { User } from './entities/user.entity';
import { Otp } from './entities/otp.entity';
@Module({
  providers: [
    ...databaseProviders,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
    {
      provide: OTP_REPOSITORY,
      useValue: Otp,
    },
  ],
  exports: [...databaseProviders, USER_REPOSITORY, OTP_REPOSITORY],
})
export class DatabaseModule {}
