import {
  Post,
  Controller,
  Body,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import * as testDto from './test.dto';
import TestService from './tests.service';
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constant';
import { AccessTokenGuard } from 'src/common/guard/accesstoken.guard';

@ApiTags('MedicalTest')
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.ADD_USER)
  @Post('addTest')
  async addTest(@Body() body: testDto.ITestDto): Promise<any> {
    try {
      const result = await this.testService.addTest(body);
      return successResponse(MESSAGES.TEST.ADD_TEST_SUCCESS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.TEST.ADD_USER)
  @Post('removeTest')
  async removeTest(@Body() body: testDto.IRemoveTest): Promise<any> {
    try {
      const result = await this.testService.removeTest(body);
      return successResponse(MESSAGES.TEST.ADD_TEST_SUCCESS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  
}
