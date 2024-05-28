import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { DatabaseModule } from './database/database.module';
import { TokensModule } from 'src/api/tokens/tokens.module'; // Ensure correct path
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './common/rabbitMq/rabbit.mq.connection'; // Ensure correct path

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokensModule,
    UsersModule,
    DatabaseModule, // Import TokensModule
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
  ],
})
export class AppModule {}
