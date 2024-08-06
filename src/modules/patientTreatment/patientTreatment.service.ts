import { Inject, Injectable } from '@nestjs/common';
import {
  MESSAGES,
  TREATMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as patientTreatmentDto from './patientTreatment.dto';
import { Treatment, User } from ' ../../../src/common/database/entities';
import { throwError } from '../../helpers/responseHadnlers';

@Injectable()
export default class patientTreatmentService {
  constructor(
    @Inject(TREATMENT_REPOSITORY)
    private readonly patientTreatmentRepository: typeof Treatment,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async patientAdded(
    data: patientTreatmentDto.IPatientTreatmentAdd,
  ): Promise<{ message: string }> {
    const patientId = await this.checkUser(data.patientName);
    const doctorId = await this.checkUser(data.doctorName);
    console.log('===================>>>>>>>>>>');
    await this.patientTreatmentRepository.create({
      ...data,
      patientId: patientId.id,
      doctorId: doctorId.id,
    });
    return { message: 'patient Added successfully' };
  }

  async checkUser(name: string) {
    const user = await this.userRepository.findOne({
      where: { fullName: name },
      attributes: ['id', 'role'],
    });
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_EXIST);
    }
    return user;
  }
}
