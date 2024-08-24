import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsDate,
} from 'class-validator';
import * as userDto from '../users/users.dto';
import { Type } from 'class-transformer';

export class IPatientTreatmentAdd {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'doctorEmail',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  doctorEmail?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'patientEmail',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  patientEmail?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'disease',
    description: 'Add all the diseases patient suffered',
    example: 'Typoid ,HIV',
    required: true,
  })
  disease: string;

  @IsOptional()
  @ApiProperty({
    name: 'firstVisitAt',
    description:
      'The next visit date of the patient to the hospital for treatment',
    example: '2024-08-06T00:00:00Z',
    required: false,
  })
  firstVisitAt?: Date;

  @IsOptional()
  @ApiProperty({
    name: 'nextScheduleAt',
    description:
      'The next visit date of patient in the hospital for the treatment',
    example: '2024-08-06T00:00:00Z',
    required: false,
  })
  nextScheduleAt?: Date;

  @IsOptional()
  @ApiProperty({
    name: 'fullyCuredAt',
    description: 'The paticular date when patient is fully cured',
    example: '2024-08-06T00:00:00Z',
    required: false,
  })
  fullyCuredAt?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'medication',
    description: 'The medications prescribed by the doctor',
    example: 'Paracetamol, Creaser-40',
    required: false,
  })
  medication?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'treatmentStatus',
    description: 'Status of the treatment of the patient',
    example: 'ONGOING',
    required: true,
  })
  treatmentStatus: string;

  @IsString()
  @ApiProperty({
    name: 'patientCondition',
    description: 'condition of the patient according to the doctor',
    example: 'STABLE',
    required: true,
  })
  patientCondition: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'notes',
    description: 'note need to follow to the patient',
    example: 'you need to take proper 8 hour sleeep',
    required: false,
  })
  notes?: string;
}
export class IUpdatePatientRecord {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'doctorEmail',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  doctorEmail?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'patientEmail',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  patientEmail?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'disease',
    description: 'Add all the diseases patient suffered',
    example: 'Typoid ,HIV',
    required: true,
  })
  disease: string;

  @IsOptional()
  @ApiProperty({
    name: 'nextScheduleAt',
    description:
      'The next visit date of patient in the hospital for the treatment',
    example: '2024-08-06T00:00:00Z',
    required: false,
  })
  nextScheduleAt?: Date;

  @IsOptional()
  @ApiProperty({
    name: 'fullyCuredAt',
    description: 'The paticular date when patient is fully cured',
    example: '2024-08-06T00:00:00Z',
    required: false,
  })
  fullyCuredAt?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'medication',
    description: 'The medications prescribed by the doctor',
    example: 'Paracetamol, Creaser-40',
    required: false,
  })
  medication?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'treatmentStatus',
    description: 'Status of the treatment of the patient',
    example: 'ONGOING',
    required: true,
  })
  treatmentStatus: string;

  @IsString()
  @ApiProperty({
    name: 'patientCondition',
    description: 'condition of the patient according to the doctor',
    example: 'STABLE',
    required: false,
  })
  patientCondition: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'notes',
    description: 'note need to follow to the patient',
    example: 'you need to take proper 8 hour sleeep',
    required: false,
  })
  notes?: string;
}

export class IGetDetails extends PickType(IPatientTreatmentAdd, [
  'patientEmail',
  'doctorEmail',
] as const) {}

export class IGetParamsRequestDto extends PickType(
  userDto.GetParamsRequestDto,
  ['page', 'limit'],
) {}

export class IReferToDto extends PickType(IPatientTreatmentAdd, [
  'patientEmail',
] as const) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'referTo',
    description: 'refer to specific hospital',
    example: 'Tanda Medical College',
    required: false,
  })
  referTo?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'referFrom',
    description: 'refer from which doctor',
    example: 'Harish Rana',
    required: false,
  })
  referFrom?: string;
}

export class IGetAppointment {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'doctorEmail',
    description:
      'The email address of the doctor associated with the appointment.',
    example: 'doctor@gmail.com',
    required: true,
  })
  doctorEmail: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'patientEmail',
    description:
      'The email address of the patient associated with the appointment.',
    example: 'patient@gmail.com',
    required: true,
  })
  patientEmail: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'appointmentDate',
    description: 'The date of the appointment.',
    example: '2024-08-06T00:00:00Z',
    required: true,
  })
  appointmentDate: string;

  @IsOptional()
  @ApiProperty({
    name: 'appointmentTime',
    description: 'The time of the appointment.',
    example: '2024-08-06T14:30:00Z',
    required: false,
  })
  appointmentTime?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'reason',
    description: 'The reason for the appointment.',
    example: 'Regular checkup, flu symptoms',
    required: false,
  })
  reason?: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'department',
    description:
      'The department or specialty of the doctor handling the appointment.',
    example: 'Radiology',
    required: true,
  })
  department: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'notes',
    description: 'Any additional notes regarding the appointment.',
    example: 'Patient needs to fast for 8 hours before the appointment.',
    required: false,
  })
  notes?: string;
}

export class IUpdateStatusOfAppointmentextends extends 

PickType(
  IGetAppointment,
  ['doctorEmail'] as const,
) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'status',
    description: 'The status of the appointment.',
    example: 'PENDING',
    required: false,
  })
  status?: string;
}
