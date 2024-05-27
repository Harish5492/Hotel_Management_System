import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from '../tokens/token.service';
import { RefreshTokenStrategy } from './stratergies/refreshToken.strategy';
import { AccessTokenStrategy } from './stratergies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import UsersService from '../users/users.service';
import { userProviders } from '../users/users.provider';
import { RabbitMqService } from '../../common/rabbitMq/rabbit.mq.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConnection } from '../../common/rabbitMq/rabbit.mq.connection';

@Module({
  imports: [
    JwtModule.register({}),
    RabbitMQModule.forRoot(RabbitMQModule, RabbitMqConnection),
  ],
  controllers: [TokensController],
  providers: [
    TokensService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...userProviders,
    RabbitMqService,
  ],
  exports: [TokensService], // Ensure TokensService is exported
})
export class TokensModule {}
