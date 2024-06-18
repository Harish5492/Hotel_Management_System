import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './rabbit.mq.connection';
import { RabbitMqService } from './rabbit.mq.service';
import { TokensModule } from '../../api/tokens/tokens.module'; // Ensure correct path
import UsersService from 'src/api/users/users.service';
import { userProviders } from 'src/api/users/users.provider';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
    TokensModule, // Import TokensModule to provide TokensService
  ],
  providers: [RabbitMqService, UsersService, ...userProviders],
  exports: [RabbitMqService, RabbitMQModule],
})
export class RabbitMqModule {}
