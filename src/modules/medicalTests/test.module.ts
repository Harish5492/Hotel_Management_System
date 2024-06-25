import { Module } from '@nestjs/common';
import TestService from './tests.service';
import { TestController } from './test.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { TokensService } from '../tokens/token.service';
import { JwtService } from '@nestjs/jwt';
import { RabbitMqModule } from 'src/common/rabbitMq/rabbit.mq.module';
import { RabbitMqService } from 'src/common/rabbitMq/rabbit.mq.service';
import { testProvider } from './tests.provider';
import UsersService from '../users/users.service';
@Module({
  imports: [DatabaseModule, RabbitMqModule],
  controllers: [TestController],
  providers: [
    TestService,
    UsersService,
    TokensService,
    JwtService,
    RabbitMqService,
    ...testProvider,
  ],
  exports: [...testProvider, TestService],
})
export class TestsModule {}
