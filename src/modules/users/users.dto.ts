/* eslint-disable prettier/prettier */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  ValidateIf,
  IsString,
  IsOptional
} from 'class-validator';

export class IUserRegisterDto {
  @IsEmail()
  @ValidateIf((object) => !object.mobileNo)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required: true,
  })
  email?: string;

  @IsNumber()
  @ValidateIf((object) => !object.email)
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobileNo', 
    description: 'Send mobileNo if using logintype=MOBILE. Length of the mobileNo',
    example: '9090012214',
    required: true,
  })
  mobileNo?: number;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    name: 'fullName',
    description: 'fullname length should be 3 or more than that',
    example: 'Harish Rana',
    required: true
  })
  fullName: string;
  
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    name: 'role',
    description: 'role length should be 3 or more than that',
    example: 'PATIENT OR DOCTOR',
    required: true
  })
  role: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'password',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true
  })
  password: string;

}

export class IUserLoginDto extends PickType(IUserRegisterDto ,['email','mobileNo','password'] as const){

}
export class GetFiltersDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@gmail.com',
    required:false
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'employeeId',
    description: 'get the unique id of the employee',
    example: 'HAR-7a53046d66c93b5e',
    required:false
  })
  employeeId?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'mobileNo', 
    description: 'Send mobileNo if using logintype=MOBILE. Length of the mobileNo',
    example: '9090012214',
    required:false,
  })
  mobileNo?: number;

  @IsOptional()
  @ApiProperty({
    name: 'fullName',
    description: 'fullname length should be 3 or more than that',
    example: 'Harish Rana',
    required:false
  })
  fullName?: string;

  @IsOptional()
  filters?: Record<string, any>; // Allow any filter types
}

export class GetParamsRequestDto {
  @ApiProperty({
    name: 'page',
    description: 'Default page = 1, Enter more than that to retrieve data.',
    example: 1,
    default: 1,
    required: true,
  },)
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value,10))
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'Default page = 10, Enter more than that to retrieve data.',
    example: 10,
    default: 10,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value,10))
  limit: number;
}
export class IChangePassword extends PickType(IUserRegisterDto ,['email','mobileNo','password'] as const){

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'newPassword',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: false
  })
  newPassword: string;
}

export class IUpdatePassword {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'token',
    description: 'Please provide the Token for verification',
    example: "11eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIx",
    required: true,
  })
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'newPassword',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true
  })
  newPassword: string;
}

export class IVerifyOneTimeCodeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'oneTimeCode',
    description: 'You should provide OTP for verification',
    example: '123456',
    required: true,
  })
  oneTimeCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'token',
    description: 'Please provide the Token for verification',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIx",
    required: true,
  })
  token: string;
}

export class ISendOneTimeCodeDto extends PickType(IUserRegisterDto,['email','mobileNo'] as const) {

}