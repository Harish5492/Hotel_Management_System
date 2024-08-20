import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEmail,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import * as userDto from '../users/users.dto';

export class IAddAmbulance {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'ambulanceNumber',
    description: 'Unique number assigned to the ambulance',
    required: true,
    example: 'AMB1234',
  })
  ambulanceNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'driverName',
    description: 'Name of the ambulance driver',
    required: true,
    example: 'John Doe',
  })
  driverName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'driverContact',
    description: 'Contact number of the ambulance driver',
    required: true,
    example: '+1234567890',
  })
  driverContact: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    name: 'availabilityStatus',
    description: 'Availability status of the ambulance',
    required: false,
    example: true,
  })
  availabilityStatus?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'serviceArea',
    description: 'The area where the ambulance provides services',
    required: false,
    example: 'Downtown',
  })
  serviceArea?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'costPerTrip',
    description: 'Cost per trip for the ambulance service',
    required: false,
    example: 1500.0,
  })
  costPerTrip?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    name: 'lastServiceDate',
    description: 'The last service date of the ambulance',
    required: false,
    example: '2024-07-25T00:00:00Z',
  })
  lastServiceDate?: Date;
}
export class IAmbulanceTakenByPatient {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'ambulanceNumber',
    description: 'Unique number assigned to the ambulance',
    required: true,
    example: 'AMB1234',
  })
  ambulanceNumber: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  email?: string;
}

export class IFacilityTakenByPatient {
  @ApiProperty({
    name: 'facilityNumber',
    description: 'Unique number identifying the facility',
    example: 'FAC-12345',
  })
  facilityNumber: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  email?: string;
}

export class IUpdateAmbulanceStatus extends PickType(IAddAmbulance, [
  'availabilityStatus',
  'ambulanceNumber',
] as const) {}

export class IGetParamsRequestDto extends PickType(
  userDto.GetParamsRequestDto,
  ['page', 'limit'],
) {}

export class IAddBedOrWheelChair {
  @ApiProperty({
    description: 'Type of service facility, e.g., WHEELCHAIR or BED',
    enum: ['WHEELCHAIR', 'BED'],
    example: 'WHEELCHAIR',
  })
  serviceType: string;

  @ApiProperty({
    name: 'facilityNumber',
    description: 'Unique number identifying the facility',
    example: 'FAC-12345',
  })
  facilityNumber: string;

  @ApiProperty({
    name: 'facilityType',
    description: 'Type of wheelchair or bed',
    example: 'Electric Wheelchair',
    required: false,
  })
  facilityType?: string;

  @ApiProperty({
    name: 'availabilityStatus',
    description: 'Availability status of the facility',
    example: true,
  })
  availabilityStatus: boolean;

  @ApiProperty({
    name: 'conditionStatus',
    description: 'Condition status of the facility, e.g., good, needs repair',
    example: 'Good',
    required: false,
  })
  conditionStatus?: string;
}
export class IUpdateFacilityStatus extends PickType(IAddBedOrWheelChair, [
  'availabilityStatus',
  'facilityNumber',
] as const) {}

export class IGetFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Type of service facility, e.g., WHEELCHAIR or BED',
    enum: ['WHEELCHAIR', 'BED'],
    example: 'WHEELCHAIR',
    required: false,
  })
  serviceType: string;

  @IsOptional()
  filters?: Record<string, any>;
}
