/* eslint-disable prettier/prettier */
import { Post, Controller, Body, HttpException, Get } from "@nestjs/common";
import  UserService  from './users.service'
import * as usersDto from './users.dto'
import { successResponse } from '../../helpers/responseHadnlers';
import {  ApiTags } from '@nestjs/swagger'
import { MESSAGES } from "src/constant";
console.log("inside the controller");
@ApiTags('USERS')
@Controller('users') 
export  class UserController {
    constructor(private readonly userservice: UserService) { }
    
    @Get('status')
    async healthCheck() {
        return 'Server is Working';
    }
    @Post('register')
    async register(@Body() body: usersDto.IUserRegisterLoginDto): Promise<any> {
        try {
            const result = await this.userservice.register(body);
            return successResponse(MESSAGES.USER.SIGN_UP_SUCCESS, result)
        }
        catch(error){
            throw new HttpException(error.message,error.status)
        }
    }

    @Post('sendOTP')
    async sendOTP(@Body() body:usersDto.IUserRegisterLoginDto):Promise<any>{
        try{
            const result = await this.userservice.sendOTP(body);
            return successResponse(MESSAGES.USER.RESEND_OTP,result)
        }
        catch(error){
            throw new HttpException(error.message,error.status)
        }
    }

    // @Post('login')
    // async login(@Body() body: usersDto.IUserRegisterLoginDto):Promise<any>{
    //     try{
    //         const result = await this.userservice.login(body);
    //         return successResponse(MESSAGES.USER.SIGN_IN_SUCCESS,result)
    //     }
    //     catch(error){
    //         throw new HttpException(error.message,error.status)
    //     }
    // }
}
