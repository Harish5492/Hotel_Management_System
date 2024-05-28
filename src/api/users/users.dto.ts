/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class IUserRegisterLoginDto {
  @IsOptional()
  @IsEmail()
  @ValidateIf((object) => !object.mobileNo)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@wallet.com',
    required: true,
  })
  email?: string;

  @IsOptional()
  @IsNumber()
  @ValidateIf((object) => !object.email)
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobileNo',
    description: 'Send mobileNo if using logintype=MOBILE',
    example: '9090012214',
    required: true,
  })
  mobileNo?: number;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    name :'firstName',
    description : 'firstName length should be 3 or more than that',
    example:'Harish',
    required:true
  })
  firstName:string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    name :'lastName',
    description : 'LastName length should be 3 or more than that',
    example:'Rana',
    required:true
  })
  lastName:string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    name: 'password',
    description: 'Password length should be 8 or more than that',
    example: '12345678',
    required: true
  })
  password: string ;

  @IsNotEmpty()
  @ApiProperty({
    name: 'loginType',
    description: 'loginType is emurable (MOBILE or EMAIL)',
    example: 'EMAIL',
    required: true,
    enum: ['MOBILE', 'EMAIL'],
  })
  loginType: string;
}

export class IVerifyOneTimeCodeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'oneTimeCode',
    description: 'OTP value is static at the moment = 123456, you can use it for each account',
    example: '123456',
    required: true,
  })
  oneTimeCode: number;
}

export class updateEmailMobileStep {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @ValidateIf((object) => !object.mobileNo)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@wallet.com',
    required: true,
  })
  email?: string;

  @IsOptional()
  @IsNumber()
  @ValidateIf((object) => !object.email)
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobileNo',
    description: 'Send mobileNo if using logintype=MOBILE',
    example: '9090012214',
    required: true,
  })
  mobileNo?: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'loginType',
    description: 'loginType is emurable (MOBILE, EMAIL)',
    example: 'EMIAL',
    required: true,
    enum: ['MOBILE', 'EMAIL'],
  })
  loginType: string;
}

export class IResendOneTimeCodeDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @ValidateIf((object) => !object.mobileNo)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@wallet.com',
    required: true,
  })
  email?: string;

  @IsOptional()
  @IsNumber()
  @ValidateIf((object) => !object.email)
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobileNo',
    description: 'Send mobileNo if using logintype=MOBILE',
    example: '9090012214',
    required: true,
  })
  mobileNo?: number ;

  @IsNotEmpty()
  @ApiProperty({
    name: 'loginType',
    description: 'loginType is emurable (MOBILE, EMAIL)',
    example: 'EMIAL',
    required: true,
    enum: ['MOBILE', 'EMAIL'],
  })
  loginType: string;
}
export class ISendOneTimeCodeDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @ValidateIf((object) => !object.mobileNo)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Send email if using logintype=EMAIL',
    example: 'note@wallet.com',
    required: true,
  })
  email?: string;

  @IsOptional()
  @IsNumber()
  @ValidateIf((object) => !object.email)
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobileNo',
    description: 'Send mobileNo if using logintype=MOBILE',
    example: '9090012214',
    required: true,
  })
  mobileNo?: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'loginType',
    description: 'loginType is emurable (MOBILE, EMAIL)',
    example: 'EMIAL',
    required: true,
    enum: ['MOBILE', 'EMAIL'],
  })
  loginType: string;
}