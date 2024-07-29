import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IAddTest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'TestName',
    description: 'Test name must be a non-empty string.',
    example: 'Blood Test',
    required: true,
  })
  TestName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'Description',
    description: 'Description of the test.',
    example: 'Blood Test is used for various tests of the body.',
    required: true,
  })
  Description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'LabName',
    description: 'Name of the lab conducting the test.',
    example: 'LalPaths Labs',
    required: true,
  })
  LabName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'Cost',
    description: 'Cost of the test in numerical value.',
    example: 500,
    required: true,
  })
  Cost: number;

  @ApiProperty({
    description: 'Day timing of the test',
    example: { startTime: '09:00', endTime: '17:00' },
  })
  @IsObject()
  @Type(() => Object)
  DayTiming: {
    startTime: string;
    endTime: string;
  };

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'WeekSchedule',
    description:
      'Comma-separated days of the week when the test is available (e.g., "Monday,Tuesday,Wednesday").',
    example: 'Monday,Tuesday,Wednesday',
    required: true,
  })
  WeekSchedule: string;
}

export class IRemoveTest extends PickType(IAddTest, [
  'TestName',
  'LabName',
] as const) {}

export class ITestTakenByPatient extends PickType(IAddTest, [
  'TestName',
  'LabName',
] as const) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    name: 'patientId', // Corrected name
    description: 'The ID of the patient who took the test.',
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
    required: true,
  })
  patientId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'TestTakenAT',
    description:
      'A string containing the day and time when the test was taken, formatted as "Day:HH:mm" (e.g., "Monday:14:00,Tuesday:09:30").',
    example: 'Monday:14:00,Tuesday:09:30',
    required: true,
  })
  TestTakenAT: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'ReportIssuedAt',
    description:
      'A string containing the day and time when the report was issued, formatted as "Day:HH:mm" (e.g., "Monday:16:00,Tuesday:11:00").',
    example: 'Monday:16:00,Tuesday:11:00',
    required: true,
  })
  ReportIssuedAt: string;
}
