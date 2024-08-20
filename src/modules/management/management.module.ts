import { Module } from '@nestjs/common';
import mangementService from './management.service';
import { managementController } from './management.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { TokensService } from '../tokens/token.service';
import { JwtService } from '@nestjs/jwt';
// import { RabbitMqModule } from 'src/common/rabbitMq/rabbit.mq.module';
// import { RabbitMqService } from 'src/common/rabbitMq/rabbit.mq.service';
import { ManagementProvider } from './management.provider';
import UsersService from '../users/users.service';
@Module({
  imports: [DatabaseModule],
  controllers: [managementController],
  providers: [
    mangementService,
    TokensService,
    UsersService,
    JwtService,
    // RabbitMqService,
    ...ManagementProvider,
  ],
  exports: [...ManagementProvider, mangementService],
})
export class managementModule {}
