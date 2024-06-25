import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TestsModule } from './modules/medicalTests/test.module';
import { DatabaseModule } from './common/database/database.module';
import { TokensModule } from 'src/modules/tokens/tokens.module'; // Ensure correct path
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from './common/rabbitMq/rabbit.mq.connection'; // Ensure correct path

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokensModule,
    UsersModule,
    TestsModule, // Import UsersModule
    DatabaseModule, // Import TokensModule
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
  ],
})
export class AppModule {}
