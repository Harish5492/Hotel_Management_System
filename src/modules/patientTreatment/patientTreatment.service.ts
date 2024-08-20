import { Inject, Injectable } from '@nestjs/common';
import {
  MESSAGES,
  SEQUELIZE,
  TEST_REPOSITORY,
  TREATMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as patientTreatmentDto from './patientTreatment.dto';
import { throwError } from '../../helpers/responseHadnlers';
import { Tests, Treatment, User } from 'src/common/database/entities';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export default class patientTreatmentService {
  constructor(
    @Inject(TREATMENT_REPOSITORY)
    private readonly patientTreatmentRepository: typeof Treatment,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Tests,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
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
    params: patientTreatmentDto.IGetParamsRequestDto,
  ): Promise<{ list: Array<Treatment>; totalCount: number }> {
    const { patientName, doctorName } = query;
    console.log(query);
    const { page, limit } = params;
    await this.getPatientData(patientName);
    const { count, rows: patientData } =
      await this.patientTreatmentRepository.findAndCountAll({
        where: { patientName: patientName, doctorName: doctorName },
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'id',
            'patientId',
            'testId',
            'userId',
            'doctorId',
          ],
        },
        include: [
          {
            model: User,
            as: 'patient',
            where: { fullName: patientName },
            attributes: {
              exclude: [
                'id',
                'token',
                'IsTokenUsed',
                'otp',
                'IsOtpUsed',
                'refreshToken',
                'expirationDate',
                'password',
                'createdAt',
                'updatedAt',
              ],
            },
          },
          {
            model: Tests,
            as: 'test',
            attributes: {
              exclude: ['id', 'patientId', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });
    return { list: patientData, totalCount: count };
  }

  async patientRefer(data: patientTreatmentDto.IReferToDto): Promise<void> {
    const patient = await this.getPatientData(data.patientName);
    if (!patient) throwError(MESSAGES.ERROR.USER_NOT_EXIST);
    await this.patientTreatmentRepository.update(
      {
        referTo: data.referTo,
        referFrom: data.referFrom,
      },
      { where: { patientName: data.patientName } },
    );
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
