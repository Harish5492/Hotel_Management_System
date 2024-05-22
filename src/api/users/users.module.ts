import { Module } from '@nestjs/common';
import UsersService from './users.service';
import { UserController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
console.log('inside the user module');
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
