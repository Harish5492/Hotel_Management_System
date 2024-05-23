import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { DatabaseModule } from './database/database.module';

console.log('inside the app module');

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
