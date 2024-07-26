import { Inject, Injectable } from '@nestjs/common';
import { Tests, User } from ' ../../../src/common/database/entities';
import { USER_REPOSITORY, TEST_REPOSITORY, MESSAGES } from '../../constant';
import * as testDto from './test.dto';
import { throwError } from '../../helpers/responseHadnlers';

@Injectable()
export default class TestService {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: typeof Tests,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async addTest(
    data: testDto.IAddTEst,
    userId: string,
  ): Promise<{ message: string }> {
    await this.checkRole(userId);
    const test = await this.IsTestExists(data);
    if (test) throwError(MESSAGES.ERROR.TEST_EXISTS);
    console.log('==============================');
    await this.testRepository.create<Tests>({ ...data });
    return { message: 'Test added successfully' };
  }

  async IsTestExists(match: object): Promise<Tests> {
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
        TestName: data.TestName,
      },
    });
    return { message: 'test removed successfully' };
  }

  async checkRole(userId: string) {
    console.log('yooyoyooyoyoyoy');
    const userType = await this.userRepository.findOne({
      where: { id: userId },
      attributes: ['role'],
    });
    console.log(userType.role);
    if (userType.role !== 'MANAGEMENT')
      throwError(MESSAGES.ROLE.ONLY_MANAGEMENT);
  }
}
