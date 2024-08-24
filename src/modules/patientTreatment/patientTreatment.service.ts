import { Inject, Injectable } from '@nestjs/common';
import {
  APPOINTMENTS_REPOSITORY,
  MESSAGES,
  TEST_REPOSITORY,
  TREATMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as patientTreatmentDto from './patientTreatment.dto';
import { throwError } from '../../helpers/responseHadnlers';
import {
  Appointment,
  Tests,
  Treatment,
  User,
} from 'src/common/database/entities';

@Injectable()
export default class patientTreatmentService {
  constructor(
    @Inject(TREATMENT_REPOSITORY)
    private readonly patientTreatmentRepository: typeof Treatment,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Tests,
    @Inject(APPOINTMENTS_REPOSITORY)
    private readonly appointmentsRepository: typeof Appointment,
  ) {}

  async patientAdded(
    data: patientTreatmentDto.IPatientTreatmentAdd,
  ): Promise<{ message: string }> {
    const patientId = await this.checkUser(data.patientEmail);
    const doctorId = await this.checkUser(data.doctorEmail);
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
    const getPatient = await this.getPatientData(data.patientEmail);

    await this.patientTreatmentRepository.update(
      {
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
    const { patientEmail, doctorEmail } = query;
    console.log(query);
    const { page, limit } = params;
    await this.getPatientData(patientEmail);
    const { count, rows: patientData } =
      await this.patientTreatmentRepository.findAndCountAll({
        where: { patientEmail, doctorEmail },
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
            where: { email: patientEmail },
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
    const patient = await this.getPatientData(data.patientEmail);
    if (!patient) throwError(MESSAGES.ERROR.USER_NOT_EXIST);
    await this.patientTreatmentRepository.update(
      {
        referTo: data.referTo,
        referFrom: data.referFrom,
      },
      { where: { patientEmail: data.patientEmail } },
    );
  }

  async checkUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'role', 'fullName'],
    });
    if (!user) {
      throw new Error(MESSAGES.ERROR.USER_NOT_EXIST);
    }
    return user;
  }

  async getPatientData(patientEmail: string) {
    const patientData = await this.patientTreatmentRepository.findOne({
      where: { patientEmail },
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
    const patientData = await this.testRepository.findOne({
      where: { patientId },
    });
    console.log('>>>>>>patientData>>>>>', patientData);
    if (!patientData) {
      throw new Error(MESSAGES.ERROR.TEST_DATA_NOT_EXISTS);
    }
    return patientData;
  }

  async getAppointment(
    data: patientTreatmentDto.IGetAppointment,
  ): Promise<{ message: string }> {
    const patientId = await this.checkUser(data.patientEmail);
    console.log(patientId);
    const doctorId = await this.checkUser(data.doctorEmail);
    console.log(doctorId);
    console.log('yo babay inside the ap9i');
    await this.appointmentsRepository.create({
      ...data,
      patientId: patientId.id,
      doctorId: doctorId.id,
    });
    return { message: 'Your Appointment has been submited successfully' };
  }

  async appoinmentStatus(
    data: patientTreatmentDto.IGetAppointment,
  ): Promise<{ message: string }> {
    const doctorId = await this.checkUser(data.doctorEmail);
    await this.checkRole(doctorId.id);
    const patientId = await this.checkUser(data.patientEmail);
    await this.appointmentsRepository.create({
      ...data,
      patientId: patientId.id,
      doctorId: doctorId.id,
    });
    return { message: 'Your Appointment has been submited successfully' };
  }

  async checkRole(userId: string) {
    const userType = await this.userRepository.findOne({
      where: { id: userId },
      attributes: ['role'],
    });
    if (userType.role !== 'DOCTOR') throwError(MESSAGES.ROLE.ONLY_DOCTOR);
  }
}
