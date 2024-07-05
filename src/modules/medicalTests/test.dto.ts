import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class IPatientTest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'testName',
    description: 'testName length must be in valid, string and is not empty',
    example: 'Blood Test',
    required: true,
  })
  testName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'referredFrom',
    description:
      'kindly add the Doctor name who has referred you for this test',
    example: 'Dr. Harish Rana',
    required: false,
  })
  referredFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'sameCollectedDate',
    description:
      'sameCollectedDate length must be in valid, string and is not empty',
    example: '12-02-2024',
  })
  sameCollectedDate: Date;

  @IsString()
  @ApiProperty({
    name: 'reportIssuedDate',
    description:
      'reportIssuedDate length must be in valid, string and is not empty',
    example: '12-02-2024',
  })
  reportIssuedDate: Date;

  @IsString()
  @ApiProperty({
    name: 'reportContent',
    description:
      'reportContent length must be in valid, string and is not empty',
    example: '12-02-2024',
  })
  reportContent: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'cost',
    description: 'Cost of the test, should be in number value',
    example: 500,
  })
  cost: number;

  userId: string;
}

export class IRemoveTest extends PickType(IPatientTest, [
  'testName',
] as const) {}

export class IAddTEst extends OmitType(IPatientTest, [
  'userId',
  'reportIssuedDate',
  'reportContent',
  'sameCollectedDate',
  'referredFrom',
] as const) {}
