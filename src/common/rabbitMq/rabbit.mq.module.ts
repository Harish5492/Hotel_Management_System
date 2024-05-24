import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './rabbit-mq.connection';
import { UsersService } from '../../../src/api/users.servicers/';
import { userProviders } from '../../../src/api/users/users.provider';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection)],
  providers: [RabbitMqService, UsersService, ...userProviders],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
