/* eslint-disable prettier/prettier */
import { Post, Controller, Body, HttpException, Get } from "@nestjs/common";
import UserService from './users.service'
import * as usersDto from './users.dto'
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { API_OPERATIONS, MESSAGES } from "src/constant"
console.log("inside the controller");
@ApiTags('USERS')
@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    @Get('status')
    async healthCheck() {
        return 'Server is Working';
    }

    /**
 * Registers a new user.
 * @param body - The user registration data object containing the necessary information.
 * @returns A Promise that resolves to a success response with the user details.
 * @throws An HttpException if the registration fails.
 */
    @ApiOperation(API_OPERATIONS.REGISTER_USER)
    @Post('register')
    async register(@Body() body: usersDto.IUserRegisterDto): Promise<any> {
        try {
            const result = await this.userservice.register(body);
            return successResponse(MESSAGES.USER.SIGN_UP_SUCCESS, result)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    /**
 * Sends a One-Time Password (OTP) to the user's email or mobile number.
 * @param body - The request body containing the user's email or mobile number.
 * @returns A Promise that resolves to a success response with the OTP details.
 * @throws An HttpException if sending the OTP fails.
 */
    @ApiOperation(API_OPERATIONS.SEND_OTP)
    @Post('sendOTP')
    async sendOTP(@Body() body: usersDto.ISendOneTimeCodeDto): Promise<any> {
        try {
            const result = await this.userservice.sendOTP(body);
            return successResponse(MESSAGES.USER.SEND_OTP, result)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    /**
 * Verifies the One-Time Password (OTP) provided by the user.
 * @param body - The request body containing the user's email or mobile number and the OTP.
 * @returns A Promise that resolves to a success response with the verification result.
 * @throws An HttpException if the OTP verification fails.
 */
    @ApiOperation(API_OPERATIONS.VERIFY_OTP)
    @Post('verifyOTP')
    async verifyOTP(@Body() body: usersDto.IVerifyOneTimeCodeDto): Promise<any> {
        try {
            const result = await this.userservice.verifyOTP(body);
            return successResponse(MESSAGES.USER.OTP_VERIFIED, result)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
    /**
   * Verifies the One-Time Password (OTP) provided by the user.
   * @param body - The request body containing the Token and the OTP.
   * @returns A Promise that resolves to a success response with the verification result.
   * @throws An HttpException if the OTP verification fails.
   */
    @ApiOperation(API_OPERATIONS.MOB_AND_EMAIL_VERIFICATION)
    @Post('mobAndEmailVerification')
    async mobAndEmailVerification(@Body() body: usersDto.IVerifyOneTimeCodeDto): Promise<any> {
        try {
            await this.userservice.mobAndEmailVerification(body);
            return successResponse(MESSAGES.USER.ACCOUNT_VERIFIED)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
    @ApiOperation(API_OPERATIONS.LOGIN_USER)
    @Post('login')
    async login(@Body() body: usersDto.IUserLoginDto): Promise<any> {
        try {
            const result = await this.userservice.login(body);
            return successResponse(MESSAGES.USER.SIGN_IN_SUCCESS, result)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
    
    @ApiOperation(API_OPERATIONS.UPDATE_PASSWORD)
    @Post('updatePassword')
    async updatePassword(@Body() body: usersDto.IChangePassword): Promise<any> {
        try {
            await this.userservice.updatePassword(body);
            return successResponse(MESSAGES.USER.UPDATE_PASSWORD)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
    @ApiOperation(API_OPERATIONS.CHANGE_PASSWORD)
    @Post('changePassword')
    async changePassword(@Body() body: usersDto.IUpdatePassword): Promise<any> {
        try {
            await this.userservice.changePassword(body);
            return successResponse(MESSAGES.USER.CHANGE_PASSWORD)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
}
