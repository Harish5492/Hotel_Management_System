import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class IAddTEst {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'TestName',
    description: 'testName length must be in valid, string and is not empty',
    example: 'Blood Test',
    required: true,
  })
  TestName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'Description',
    description: 'Blood Test is used to various test of body',
    example: 'Blood Test is used to various test of body',
    required: true,
  })
  Description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'LabName',
    description: 'Lab Name which conduct the test of the patient',
    example: 'LalPaths Labs',
    required: true,
  })
  LabName: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Cost',
    description: 'Cost of the test, should be in number value',
    example: 500,
  })
  Cost: number;
}

export class IRemoveTest extends PickType(IAddTEst, ['TestName'] as const) {}
