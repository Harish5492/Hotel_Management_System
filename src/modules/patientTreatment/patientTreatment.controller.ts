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
import patientTreatmentServices from './patientTreatment.service';
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constant';
import { AccessTokenGuard } from 'src/common/guard/accesstoken.guard';
import { User } from 'src/common/decorators';
@ApiTags('PatientTreatment')
@Controller('treatment')
export class patientTreatmentController {
  constructor(
    private readonly patientTreatmentService: patientTreatmentServices,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
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
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.UPDATE_PATIENT_DATA)
  @Post('updatePatientRecord')
  async updatePatientRecord(
    @Body() body: patientTreatmentDto.IUpdatePatientRecord,
  ): Promise<any> {
    try {
      const result =
        await this.patientTreatmentService.updatePatientRecord(body);
      return successResponse(MESSAGES.PATIENT.UPDATED_PATIENT_DATA, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.GET_PATIENT_DETAILS)
  @Get('getPatientDetails/:page/:limit')
  async getPatientDetails(
    @Query() query: patientTreatmentDto.IGetDetails,
    @Param() params: patientTreatmentDto.IGetParamsRequestDto,
  ): Promise<any> {
    try {
      const result = await this.patientTreatmentService.getPatientDetails(
        query,
        params,
      );
      return successResponse(MESSAGES.PATIENT.FETCHED_PATIENT_DETAILS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.PATIENT_REFER)
  @Post('patientReferTo')
  async patientRefer(
    @Body() body: patientTreatmentDto.IReferToDto,
  ): Promise<any> {
    try {
      await this.patientTreatmentService.patientRefer(body);
      return successResponse(MESSAGES.PATIENT.PATIENT_REFER);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.PATIENT.GET_APPOINTMENT)
  @Post('getAppointment')
  async getAppointment(
    @Body() body: patientTreatmentDto.IGetAppointment,
  ): Promise<any> {
    try {
      const result = await this.patientTreatmentService.getAppointment(body);
      return successResponse(MESSAGES.PATIENT.PATIENT_REFER, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation(API_OPERATIONS.PATIENT.GET_APPOINTMENT)
  @Post('appoinmentStatus')
  async appoinmentStatus(
    @Body() body: patientTreatmentDto.IGetAppointment,
  ): Promise<any> {
    try {
      const result = await this.patientTreatmentService.appoinmentStatus(body);
      return successResponse(MESSAGES.PATIENT.PATIENT_REFER, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
