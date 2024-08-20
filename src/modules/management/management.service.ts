import { Inject, Injectable } from '@nestjs/common';
import {
  AMBULANCE_REPOSITORY,
  MESSAGES,
  SERVICE_FACILITY_REPOSITORY,
  USER_REPOSITORY,
} from '../../constant';
import * as managementDto from './management.dto';
import { throwError } from '../../helpers/responseHadnlers';
import { ServiceFacility, Ambulance, User } from 'src/common/database/entities';
import { WhereOptions } from 'sequelize';

@Injectable()
export default class managementService {
  constructor(
    @Inject(AMBULANCE_REPOSITORY)
    private readonly ambulanceRepository: typeof Ambulance,
    @Inject(SERVICE_FACILITY_REPOSITORY)
    private readonly serviceRepository: typeof ServiceFacility,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}
  async addAmbulance(
    data: managementDto.IAddAmbulance,
  ): Promise<{ message: string }> {
    const ambulance = await this.checkAmbulanceNumber(data.ambulanceNumber);
    if (ambulance) throwError(MESSAGES.ERROR.AMBULANCE_EXISTS);
    await this.ambulanceRepository.create({
      ...data,
    });
    return { message: 'ambulance Added successfully' };
  }
  async updateAmbulanceStatus(
    data: managementDto.IUpdateAmbulanceStatus,
  ): Promise<{ message: string }> {
    await this.ambulanceRepository.update(
      {
        availabilityStatus: data.availabilityStatus,
      },
      {
        where: { ambulanceNumber: data.ambulanceNumber },
      },
    );
    return { message: 'ambulance status updated successfully' };
  }

  async getAllAmbulance(
    params: managementDto.IGetParamsRequestDto,
  ): Promise<{ list: Array<Ambulance>; totalCount: number }> {
    const { page, limit } = params;
    const { count, rows: ambulanceData } =
      await this.ambulanceRepository.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
    return { list: ambulanceData, totalCount: count };
  }

  async ambulanceTakenByPatient(data: managementDto.IAmbulanceTakenByPatient) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    console.log(user);
    if (!user) throwError(MESSAGES.ERROR.USER_NOT_FOUND);
    await this.ambulanceRepository.update(
      { assignedPatientId: user.id, availabilityStatus: false },
      {
        where: { ambulanceNumber: data.ambulanceNumber },
      },
    );
  }

  async checkAmbulanceNumber(ambulanceNo: string) {
    return !!(await this.ambulanceRepository.findOne({
      where: { ambulanceNumber: ambulanceNo },
    }));
  }

  async checkBedOrWheelChairNo(facilityNumber: string) {
    const facilityNo = await this.serviceRepository.findOne({
      where: { facilityNumber: facilityNumber },
    });
    return !!facilityNo;
  }
  async addBedOrWheelChair(
    data: managementDto.IAddBedOrWheelChair,
  ): Promise<{ message: string }> {
    const facilityNo = await this.checkBedOrWheelChairNo(data.facilityNumber);
    if (facilityNo) throwError(MESSAGES.ERROR.FACILITY_EXISTS);
    await this.serviceRepository.create({
      ...data,
    });
    return { message: 'Facility Added successfully' };
  }
  async updateBedOrWheelChairStatus(
    data: managementDto.IUpdateFacilityStatus,
  ): Promise<{ message: string }> {
    await this.serviceRepository.update(
      {
        availabilityStatus: data.availabilityStatus,
      },
      {
        where: { facilityNumber: data.facilityNumber },
      },
    );
    return { message: 'facility updated successfully' };
  }

  async getAllFacility(
    params: managementDto.IGetParamsRequestDto,
    query: managementDto.IGetFilterDto,
  ): Promise<{ list: Array<ServiceFacility>; totalCount: number }> {
    const { page, limit } = params;
    const { serviceType } = query;

    const where: WhereOptions<ServiceFacility> = {};

    if (serviceType) {
      where.serviceType = serviceType; // Apply serviceType filter if provided
    }

    const { count, rows: facilityData } =
      await this.serviceRepository.findAndCountAll({
        where,
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

    return { list: facilityData, totalCount: count };
  }

  async facilityTakenByPatient(data: managementDto.IFacilityTakenByPatient) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) throwError(MESSAGES.ERROR.USER_NOT_FOUND);
    await this.serviceRepository.update(
      { assignedPatientId: user.id, availabilityStatus: false },
      {
        where: { facilityNumber: data.facilityNumber },
      },
    );
  }
}
