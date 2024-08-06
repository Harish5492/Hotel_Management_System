import { Module } from '@nestjs/common';
import patientTreatmentService from './patientTreatment.service';
import { patientTreatmentController } from './patientTreatment.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { TokensService } from '../tokens/token.service';
import { JwtService } from '@nestjs/jwt';
// import { RabbitMqModule } from 'src/common/rabbitMq/rabbit.mq.module';
// import { RabbitMqService } from 'src/common/rabbitMq/rabbit.mq.service';
import { patientProvider } from './patientTreatment.provider';
import UsersService from '../users/users.service';
@Module({
  imports: [DatabaseModule],
  controllers: [patientTreatmentController],
  providers: [
    patientTreatmentService,
    TokensService,
    UsersService,
    JwtService,
    // RabbitMqService,
    ...patientProvider,
  ],
  exports: [...patientProvider, patientTreatmentService],
})
export class patientTreatmentModule {}
