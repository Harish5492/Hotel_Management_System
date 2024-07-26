import { Module } from '@nestjs/common';
import UsersService from './users.service';
import { UserController } from './users.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { TokensService } from '../tokens/token.service';
import { JwtService } from '@nestjs/jwt';
// import { RabbitMqModule } from 'src/common/rabbitMq/rabbit.mq.module';
// import { RabbitMqService } from 'src/common/rabbitMq/rabbit.mq.service';
import { userProviders } from './users.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UsersService,
    TokensService,
    JwtService,
    // RabbitMqService,
    ...userProviders,
  ],
  exports: [...userProviders, UsersService],
})
export class UsersModule {}
