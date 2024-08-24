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
import * as managementDto from './management.dto';
import managementServices from './management.service';
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS, MESSAGES } from 'src/constant';
import { AccessTokenGuard } from 'src/common/guard/accesstoken.guard';
import { User } from 'src/common/decorators';

@ApiTags('Management')
@Controller('management')
export class managementController {
  constructor(private readonly managementService: managementServices) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.ADD_AMBULANCE)
  @Post('addAmbulance')
  async addAmbulance(@Body() body: managementDto.IAddAmbulance): Promise<any> {
    try {
      const result = await this.managementService.addAmbulance(body);
      return successResponse(MESSAGES.MANAGEMENT.AMBULANCE_ADDED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.AMBULANCE_TAKEN_BY_PATIENT)
  @Post('ambulanceTakenByPatient')
  async ambulanceTakenByPatient(
    @Body() body: managementDto.IAmbulanceTakenByPatient,
  ): Promise<any> {
    try {
      await this.managementService.ambulanceTakenByPatient(body);
      return successResponse(MESSAGES.MANAGEMENT.AMBULANCE_TAKEN);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.UPDATE_AMBULANCE_AVALIBILITY_STATUS)
  @Put('updateAmbulanceAvailablityStatus')
  async updateAmbulanceStatus(
    @Body()
    body: managementDto.IUpdateAmbulanceStatus,
  ): Promise<any> {
    try {
      const result = await this.managementService.updateAmbulanceStatus(body);
      return successResponse(
        MESSAGES.MANAGEMENT.UPDATE_AMBULANCE_STATUS,
        result,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.GET_ALL_AMBULANCE)
  @Put('getAllAmbulance/:page/:limit')
  async getAmbulance(
    @Param()
    params: managementDto.IGetParamsRequestDto,
  ): Promise<any> {
    try {
      const result = await this.managementService.getAllAmbulance(params);
      return successResponse(MESSAGES.MANAGEMENT.GET_AMBULANCE_DETAILS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.FACILITY_ADDED)
  @Post('addBedOrWheelChair')
  async addBedOrWheelChair(
    @Body() body: managementDto.IAddBedOrWheelChair,
  ): Promise<any> {
    try {
      const result = await this.managementService.addBedOrWheelChair(body);
      return successResponse(MESSAGES.MANAGEMENT.FACILITY_ADDED, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.UPDATE_FACILITY_STATUS)
  @Put('updateBedOrWheelChairStatus')
  async updateBedOrWheelChairStatus(
    @Body()
    body: managementDto.IUpdateFacilityStatus,
  ): Promise<any> {
    try {
      const result =
        await this.managementService.updateBedOrWheelChairStatus(body);
      return successResponse(
        MESSAGES.MANAGEMENT.UPDATE_AMBULANCE_STATUS,
        result,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.GET_ALL_AMBULANCE)
  @Get('getAllFacility/:page/:limit')
  async getAllFacility(
    @Param()
    params: managementDto.IGetParamsRequestDto,
    @Query() query: managementDto.IGetFilterDto,
  ): Promise<any> {
    try {
      const result = await this.managementService.getAllFacility(params, query);
      return successResponse(MESSAGES.MANAGEMENT.GET_FACILITY_DETAILS, result);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation(API_OPERATIONS.MANAGEMENT.FACILITY_TAKEN_BY_PATIENT)
  @Post('facilityTakenByPatient')
  async facilityTakenByPatient(
    @Body() body: managementDto.IFacilityTakenByPatient,
  ): Promise<any> {
    try {
      await this.managementService.facilityTakenByPatient(body);
      return successResponse(MESSAGES.MANAGEMENT.FACILITY_ADDED);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
