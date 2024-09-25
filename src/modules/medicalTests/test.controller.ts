import {
  Post,
  Controller,
  Body,
  HttpException,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
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
  @Put('disableTest')
  async disableTest(
    @Body() body: testDto.IRemoveTest,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      const result = await this.testService.disableTest(body, userId);
      return successResponse(MESSAGES.TEST.DISABLE_TEST, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.TEST_STATUS)
  @Post('testTakenByPatient')
  async testTakenByPatient(
    @Body() body: testDto.ITestTakenByPatient,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      const result = await this.testService.testTakenByPatient(body, userId);
      return successResponse(MESSAGES.TEST.TEST_TAKEN_OF_PATIENT, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.TEST_STATUS)
  @Post('testTakenByPatientByOnline')
  async testTakenByPatientByOnline(
    @Body() body: testDto.ITestTakenByPatientByOnline,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      const result = await this.testService.testTakenByPatientByOnline(
        body,
        userId,
      );
      return successResponse(MESSAGES.TEST.TEST_TAKEN_OF_PATIENT, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.TEST_STATUS)
  @Post('reportGivenOrDecline')
  async reportGivenOrDecline(
    @Body() body: testDto.IReportGivenOrDecline,
    @User() user: Record<string, any>,
  ): Promise<any> {
    try {
      const userId = user.userId;
      const result = await this.testService.reportGivenOrDecline(body, userId);
      return successResponse(MESSAGES.TEST.REPORT_GIVEN, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.TEST_STATUS)
  @Get('getAllTests/:page/:limit')
  async getAllTests(
    @Param() params: testDto.IGetParamsRequestDto,
    @Query() query: testDto.IGetFilterDto,
  ): Promise<any> {
    try {
      const result = await this.testService.getAllTests(params, query);
      return successResponse(MESSAGES.TEST.REPORT_GIVEN, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
