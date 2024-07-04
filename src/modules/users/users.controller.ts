/* eslint-disable prettier/prettier */
import { Post, Controller, Body, HttpException, Get, UseGuards, Req, Query, Param } from "@nestjs/common";
import UserService from './users.service'
import * as usersDto from './users.dto'
import { User } from '../../common/decorators'
import { successResponse } from '../../helpers/responseHadnlers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { API_OPERATIONS, MESSAGES } from "src/constant"
import { AccessTokenGuard } from "src/common/guard/accesstoken.guard";


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
    @ApiOperation(API_OPERATIONS.USER.REGISTER_USER)
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
    @ApiOperation(API_OPERATIONS.USER.SEND_OTP)
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
    @ApiOperation(API_OPERATIONS.USER.VERIFY_OTP)
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
    @ApiOperation(API_OPERATIONS.USER.MOB_AND_EMAIL_VERIFICATION)
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
    @ApiOperation(API_OPERATIONS.USER.LOGIN_USER)
    @Post('login')
    async login(@Body() body: usersDto.IUserLoginDto): Promise<any> {
        try {
            console.log("enter in api")
            const result = await this.userservice.login(body);
            return successResponse(MESSAGES.USER.SIGN_IN_SUCCESS, result)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get('logout')
    async logout(@Req() req: Request | any) {
        try {
            const userId = req.user.userId;
            await this.userservice.logout(userId);
            return successResponse(MESSAGES.USER.LOGGED_OUT);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Post('deleteAccount')
    async deleteAccount(
        @User() user: Record<string, any>
    ) {
        try {
            const userId = user.userId
            await this.userservice.deleteAccount(userId);
            return successResponse(MESSAGES.USER.ACCOUNT_DELETED);
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Post('updateProfile')
    async updateProfile(
        @User() user: Record<string, any>,
        @Body() body: usersDto.IUserRegisterDto
    ) {
        try {
            const userId = user.userId
            await this.userservice.updateUser(userId, body);
            return successResponse(MESSAGES.USER.ACCOUNT_DELETED);
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }



    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get('searchUser/:page/:limit')
    async getDetailOfuser(
        @Param() params: usersDto.GetParamsRequestDto,
        @Query() querys: usersDto.GetFiltersDto): Promise<any> {
        try {
            console.log("yooo")
            // const cleanedQuery = JSON.parse(querys.filters.replace(/\s/g, ''));
            const result = await this.userservice.searchUser(params, querys)
            return successResponse(MESSAGES.USER.GET_USER_DETAILE, result);
        }
        catch (error) {
            throw new HttpException(error.message, error.status)

        }
    }

    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @ApiOperation(API_OPERATIONS.USER.UPDATE_PASSWORD)
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

    @ApiOperation(API_OPERATIONS.USER.CHANGE_PASSWORD)
    @Post('forgotPassword')
    async forgotPassword(@Body() body: usersDto.IUpdatePassword): Promise<any> {
        try {
            await this.userservice.forgotPassword(body);
            return successResponse(MESSAGES.USER.CHANGE_PASSWORD)
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
}
