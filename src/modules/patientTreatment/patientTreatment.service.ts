import { Inject, Injectable } from '@nestjs/common';
import {
  MESSAGES,
  TEST_REPOSITORY,
  TREATMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as patientTreatmentDto from './patientTreatment.dto';
import { Tests, Treatment, User } from ' ../../../src/common/database/entities';
import { throwError } from '../../helpers/responseHadnlers';

@Injectable()
export default class patientTreatmentService {
  constructor(
    @Inject(TREATMENT_REPOSITORY)
    private readonly patientTreatmentRepository: typeof Treatment,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Tests,
  ) {}

  async patientAdded(
    data: patientTreatmentDto.IPatientTreatmentAdd,
  ): Promise<{ message: string }> {
    const patientId = await this.checkUser(data.patientName);
    const doctorId = await this.checkUser(data.doctorName);
    const testId = await this.checkTest(patientId.id);
    await this.patientTreatmentRepository.create({
      ...data,
      patientId: patientId.id,
      doctorId: doctorId.id,
      testId: testId.id,
    });
    return { message: 'patient Added successfully' };
  }

  async updatePatientRecord(
    data: patientTreatmentDto.IUpdatePatientRecord,
  ): Promise<{ message: string }> {
    const getPatient = await this.getPatientData(data.patientName);

    await this.patientTreatmentRepository.update(
      {
        doctorName: data.doctorName,
        disease: data.disease,
        nextScheduleAt: data.nextScheduleAt,
        fullyCuredAt: data.fullyCuredAt,
        medication: data.medication,
        treatmentStatus: data.treatmentStatus,
        patientCondition: data.patientCondition,
        notes: data.notes,
      },
      {
        where: { id: getPatient.id },
      },
    );
    return { message: 'patient record has been updated successfully' };
  }

  async getPatientDetails(
    query: patientTreatmentDto.IGetDetails,
  ): Promise<{ message: string }> {
    return { message: 'patientData has been fetched successfully' };
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

  async getPatientData(patientName: string) {
    const patientData = await this.patientTreatmentRepository.findOne({
      where: { patientName: patientName },
      attributes: ['id'],
    });
    if (!patientData) throwError(MESSAGES.ERROR.USER_NOT_EXIST);
    return patientData;
  }

  // async updatePatientRecord(match: object, data: object): Promise<void> {
  //   await this.patientTreatmentRepository.update(
  //     { ...data },
  //     { where: { ...match } },
  //   );
  // }

  async checkTest(patientId: string) {
    console.log(patientId);
    const patientData = await this.testRepository.findOne({
      where: { patientId: patientId },
    });
    console.log('>>>>>>patientData>>>>>', patientData);
    if (!patientData) {
      throw new Error(MESSAGES.ERROR.TEST_DATA_NOT_EXISTS);
    }
    return patientData;
  }
}
