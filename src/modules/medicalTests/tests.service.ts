import { Inject, Injectable } from '@nestjs/common';
import { Test } from ' ../../../src/common/database/entities';
import { TIME } from '../../constant';
import * as testDto from './test.dto';
import { TEST_REPOSITORY, MESSAGES } from '../../constant';
import { throwError } from '../../helpers/responseHadnlers';

@Injectable()
export default class TestService {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Test,
  ) {}

  async addTest(data: testDto.IAddTEst): Promise<{ message: string }> {
    const test = await this.IsTestExists(data);
    if (test) throwError(MESSAGES.ERROR.TEST_EXISTS);
    await this.testRepository.create<Test>({ ...data });
    return { message: 'Test added successfully' };
  }

  async IsTestExists(match: object): Promise<Test> {
    const test = await this.testRepository.findOne({
      where: { ...match },
    });
    return test;
  }

  async removeTest(data: testDto.IRemoveTest): Promise<{ message: string }> {
    const test = await this.IsTestExists(data);
    if (!test) throwError(MESSAGES.ERROR.TEST_NOT_EXISTS);
    await this.testRepository.destroy({
      where: {
        testName: data.testName,
      },
    });
    return { message: 'test removed successfully' };
  }

  async patientTestTaken(
    data: testDto.IPatientTest,
    user: string,
  ): Promise<{ message: string }> {
    data.userId = user;
    await this.testRepository.create<Test>({ ...data });
    return { message: 'Test has been taken by user' };
  }
}
