import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ITestDto {
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
    name: 'TestDate',
    description: 'testDate length must be in valid, string and is not empty',
    example: '12-02-2024',
  })
  testDate: string;

  @IsString()
  @ApiProperty({
    name: 'TestResult',
    description: 'testDate length must be in valid, string and is not empty',
    example: '12-02-2024',
  })
  testResult: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'Cost',
    description: 'Cost of the test, should be in number value',
    example: 500,
  })
  cost: number;
}

export class IRemoveTest extends PickType(ITestDto, ['testName'] as const) {}
