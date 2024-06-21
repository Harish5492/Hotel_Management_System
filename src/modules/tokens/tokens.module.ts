import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './token.service'; // Make sure the import path is correct
import { RefreshTokenStrategy } from './stratergies/refreshToken.strategy';
import { AccessTokenStrategy } from './stratergies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import UsersService from '../users/users.service';
import { DatabaseModule } from '../../common/database/database.module'; // Ensure DatabaseModule is imported
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqService } from '../../common/rabbitMq/rabbit.mq.service';
import { RabbitMqConnection } from '../../common/rabbitMq/rabbit.mq.connection';

@Module({
  imports: [
    JwtModule.register({}),
    DatabaseModule, // Import DatabaseModule to provide repositories
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
  ],
  controllers: [TokensController],
  providers: [
    TokensService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RabbitMqService,
  ],
  exports: [TokensService],
})
export class TokensModule {}
