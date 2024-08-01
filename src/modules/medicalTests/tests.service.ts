import { Inject, Injectable } from '@nestjs/common';
import {
  PatientTestRecord,
  Tests,
  User,
} from ' ../../../src/common/database/entities';
import {
  TEST_REPOSITORY,
  MESSAGES,
  PATIENT_TEST_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as testDto from './test.dto';
import { throwError } from '../../helpers/responseHadnlers';
import { WhereOptions } from 'sequelize';

@Injectable()
export class TestService {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Tests,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    @Inject(PATIENT_TEST_REPOSITORY)
    private readonly patientTestRepository: typeof PatientTestRecord,
  ) {}

  async addTest(
    data: testDto.IAddTest,
    userId: string,
  ): Promise<{ message: string }> {
    await this.checkRole(userId);
    const test = await this.IsTestExists(data.LabName, data.TestName);
    if (test) throwError(MESSAGES.ERROR.TEST_EXISTS);
    await this.testRepository.create<Tests>({ ...data });
    return { message: 'Test added successfully' };
  }

  async IsTestExists(LabName: string, TestName: string) {
    const test = await this.testRepository.findOne({
      where: { LabName, TestName },
      attributes: ['TestName', 'LabName', 'Cost'],
    });
    return test;
  }

  async removeTest(
    data: testDto.IRemoveTest,
    userId: string,
  ): Promise<{ message: string }> {
    await this.checkRole(userId);
    const test = await this.IsTestExists(data.LabName, data.TestName);
    if (!test) throwError(MESSAGES.ERROR.TEST_NOT_EXISTS);
    await this.testRepository.destroy({
      where: {
        TestName: data.TestName,
        LabName: data.LabName,
      },
    });
    return { message: 'test removed successfully' };
  }

  async testTakenByPatient(
    data: testDto.ITestTakenByPatient,
    userId: string,
  ): Promise<{ message: string }> {
    const test = await this.IsTestExists(data.LabName, data.TestName);
    if (!test) throwError(MESSAGES.ERROR.TEST_NOT_EXISTS);
    await this.checkRole(userId);
    console.log('chin tapak dham dham');
    const testTaken = await this.patientTestExists(
      data.patientId,
      // data.LabName,
      // data.TestName,
    );
    if (testTaken) throwError(MESSAGES.ERROR.TEST_EXISTS);
    await this.patientTestRepository.create<PatientTestRecord>({
      ...data,
      // Cost: test.Cost,
    });
    return { message: 'test has been taken successfully' };
  }

  async reportGivenOrDecline(
    data: testDto.IReportGivenOrDecline,
    userId: string,
  ): Promise<{ message: string }> {
    await this.checkRole(userId);
    await this.updateTest(
      {
        patientId: data.patientId,
        LabName: data.LabName,
        TestName: data.TestName,
      },
      {
        status: data.status,
        ReportContent: data.ReportContent,
        ReportGivenAt: data.ReportGivenAt,
      },
    );
    return { message: 'test report has been given successfully' };
  }

  async getAllTests(
    params: testDto.IGetParamsRequestDto,
    filters: testDto.IGetFilterDto,
  ): Promise<{ list: Array<Tests>; countNumber: number }> {
    const { page, limit } = params;
    // const { patientId, LabName, TestName } = filters;
    const { LabName, TestName } = filters;
    const where: WhereOptions<Tests> = {};
    // if (patientId) where.patientId = patientId;
    if (LabName) where.LabName = LabName;
    if (TestName) where.TestName = TestName;
    const { count, rows: tests } = await this.testRepository.findAndCountAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      attributes: [
        'TestName',
        'LabName',
        'Cost',
        'WeekSchedule',
        'status',
        'patientId',
        'TestTakenAt',
        'ReportGivenAt',
        'ReportContent',
      ],
    });
    return { list: tests, countNumber: count };
  }

  async updateTest(match: object, data: object): Promise<void> {
    await this.testRepository.update({ ...data }, { where: { ...match } });
  }

  async patientTestExists(
    patientId: string,
    // LabName: string,
    // TestName: string,
  ) {
    const patientTest = await this.patientTestRepository.findOne({
      where: { patientId },
      include: {
        model: this.testRepository,
      },
      // attributes: ['TestName', 'LabName', 'patientId'],
    });
    return patientTest;
  }

  async checkRole(userId: string) {
    const userType = await this.userRepository.findOne({
      where: { id: userId },
      attributes: ['role'],
    });
    if (userType.role !== 'MANAGEMENT')
      throwError(MESSAGES.ROLE.ONLY_MANAGEMENT);
  }
}
