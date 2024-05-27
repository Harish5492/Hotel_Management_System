import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './rabbit.mq.connection';
import { RabbitMqService } from './rabbit.mq.service';
import { TokensModule } from '../../api/tokens/tokens.module'; // Ensure correct path

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
    TokensModule, // Import TokensModule to provide TokensService
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
