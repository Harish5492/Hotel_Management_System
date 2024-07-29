import {
  Post,
  Controller,
  Body,
  HttpException,
  UseGuards,
  Delete,
} from '@nestjs/common';
import * as testDto from './test.dto';
import TestService from './tests.service';
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constant';
import { AccessTokenGuard } from 'src/common/guard/accesstoken.guard';
import { User } from 'src/common/decorators';

@ApiTags('MedicalTest')
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.ADD_TEST)
  @Post('addTest')
  async addTest(
    @Body() body: testDto.IAddTest,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      const result = await this.testService.addTest(body, userId);
      return successResponse(MESSAGES.TEST.ADD_TEST_SUCCESS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.REMOVE_TEST)
  @Delete('removeTest')
  async removeTest(@Body() body: testDto.IRemoveTest): Promise<any> {
    try {
      const result = await this.testService.removeTest(body);
      return successResponse(MESSAGES.TEST.REMOVED_TEST, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // @ApiBearerAuth()
  // @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.TEST_STATUS)
  @Post('testTakenByPatient')
  async testTakenByPatient(
    @Body() body: testDto.ITestTakenByPatient,
  ): Promise<any> {
    try {
      const result = await this.testService.testTakenByPatient(body);
      return successResponse(MESSAGES.TEST.TEST_TAKEN_OF_PATIENT, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
