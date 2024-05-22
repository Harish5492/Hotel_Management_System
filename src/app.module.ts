import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
console.log('inside the app module');
@Module({
  imports: [UsersModule],
})
export class AppModule {}
