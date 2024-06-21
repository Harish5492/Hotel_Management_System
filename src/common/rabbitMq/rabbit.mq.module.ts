import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './rabbit.mq.connection';
import { RabbitMqService } from './rabbit.mq.service';
import { TokensModule } from '../../modules/tokens/tokens.module'; // Ensure correct path
import UsersService from 'src/modules/users/users.service';
import { userProviders } from 'src/modules/users/users.provider';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
    TokensModule, // Import TokensModule to provide TokensService
  ],
  providers: [RabbitMqService, UsersService, ...userProviders],
  exports: [RabbitMqService, RabbitMQModule],
})
export class RabbitMqModule {}
