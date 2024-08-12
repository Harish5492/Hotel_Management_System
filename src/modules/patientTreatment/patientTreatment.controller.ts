import {
  Post,
  Controller,
  Body,
  HttpException,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import * as patientTreatmentDto from './patientTreatment.dto';
import patientTreatmentService from './patientTreatment.service';
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constant';
import { AccessTokenGuard } from 'src/common/guard/accesstoken.guard';
import { User } from 'src/common/decorators';
@ApiTags('PatientTreatment')
@Controller('treatment')
export class patientTreatmentController {
  constructor(
    private readonly patientTreatmentService: patientTreatmentService,
  ) {}

  // @ApiBearerAuth()
  // @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.ADD_PATIENT_DATA)
  @Post('patientTreatmentAdd')
  async patientTreatmentAdd(
    @Body() body: patientTreatmentDto.IPatientTreatmentAdd,
  ): Promise<any> {
    try {
      const result = await this.patientTreatmentService.patientAdded(body);
      return successResponse(MESSAGES.PATIENT.PATIENT_ADDED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // @ApiBearerAuth()
  // @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.UPDATE_PATIENT_DATA)
  @Post('updatePatientRecord')
  async updatePatientRecord(
    @Body() body: patientTreatmentDto.IUpdatePatientRecord,
  ): Promise<any> {
    try {
      const result =
        await this.patientTreatmentService.updatePatientRecord(body);
      return successResponse(MESSAGES.PATIENT.PATIENT_ADDED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.PATIENT.GET_PATIENT_DETAILS)
  @Get('getPatientDetails')
  async getPatientDetails(
    @Query() query: patientTreatmentDto.IGetDetails,
  ): Promise<any> {
    try {
      const result =
        await this.patientTreatmentService.getPatientDetails(query);
      return successResponse(MESSAGES.PATIENT.PATIENT_ADDED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
