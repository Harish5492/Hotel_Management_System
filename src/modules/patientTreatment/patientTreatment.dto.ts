import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import * as userDto from '../users/users.dto';

export class IPatientTreatmentAdd {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'doctorName',
    description: 'Name of the doctor whose under the treatment going through',
    required: true,
    example: 'Sourav Sharma',
  })
  doctorName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'patientName',
    description: 'Name of the patient who suffered from the diseases',
    required: true,
    example: 'Ayush Jamwal',
  })
  patientName: string;

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
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'doctorName',
    description: 'Name of the doctor whose under the treatment going through',
    required: false,
    example: 'Sourav Sharma',
  })
  doctorName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'patientName',
    description: 'Name of the patient who suffered from the diseases',
    required: true,
    example: 'Ayush Jamwal',
  })
  patientName: string;

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
  'patientName',
  'doctorName',
] as const) {}

export class IGetParamsRequestDto extends PickType(
  userDto.GetParamsRequestDto,
  ['page', 'limit'],
) {}

export class IReferToDto extends PickType(IPatientTreatmentAdd, [
  'patientName',
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
