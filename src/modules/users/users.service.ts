/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { User } from '../../common/database/entities';
import { throwError } from "../../helpers/responseHadnlers";
import * as Utilities from '../../helpers/utilities.helper'
import Twilio from '../../helpers/twilio.helper'
import EmailService from '../../helpers/smtp.helper'
import { TIME } from '../../constant';
import * as UserDto from './users.dto';
import { USER_REPOSITORY, MESSAGES } from 'src/constant';
import { Op, WhereOptions } from "sequelize";
import { TokensService } from "../tokens/token.service";


@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly tokenService: TokensService,
  ) { }

  async register(
    data: UserDto.IUserRegisterDto
  ): Promise<{ message: string }> {
    if (data.mobileNo.toString().length !== 10) {
      throwError(MESSAGES.ERROR.INVALID_MOBILE_NO);
    }
    const user = await this.checkIfUserExists(data);
    if (user) throwError(MESSAGES.ERROR.USER_EXIST)
      if(data.password !== data.confirmPassword) throwError(MESSAGES.ERROR.PASSWORD_NOT_MATCHED)
    data.password = await Utilities.hashPassword(data.password)
    if (data.role === 'DOCTOR' || data.role === 'MANAGEMENT') {
      data.Availability = 'Available'
    }
    else {
      data.Availability = null
    }
    const userId = Utilities.generateHexadecimal(data.fullName)
    await this.userRepository.create<User>({ ...data, employeeId: userId });
    return { message: "Registration successful" };
  }

  async login(data: UserDto.IUserLoginDto): Promise<object> {
    const { email, mobileNo, password } = data
    const User = await this.getUserDetail(email, mobileNo)

    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    // await this.IsMobileOrEmailValid(email, mobileNo)
    if (!await Utilities.comparePassword(password, User.password)) throwError(MESSAGES.ERROR.INCORRECT_PASSWORD)
    const tokens = await this.getJwtTokens({ userId: User.id, email: User.email }, true, TIME.JWT.THIRTY_DAYS);

    await this.updateUser({ email: User.email }, { refreshToken: tokens.refreshToken });
    return tokens

  }
  async IsMobileOrEmailValid(email: string, mobileNo: number): Promise<void> {
    const User = await this.getUserDetail(email, mobileNo);
    if (!User.isMobVerified || !User.isEmailVerified) {
      throwError(MESSAGES.ERROR.USER_NOT_VERIFIED);
    }
  }
  
  async getJwtTokens(
    data: any,
    isAccessNedeed: boolean,
    time: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.tokenService.getTokens(data, time);
    if (isAccessNedeed) return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user = await this.getUser({ id: userId });
    if (!user) throwError(MESSAGES.ERROR.ACCESS_DENIED);
    await this.updateUser(
      { id: user.id },
      { refreshToken: null },
    );
  }

  async deleteAccount(userId: string): Promise<void> {
    const user = await this.getUser({ id: userId });
    if (!user) throwError(MESSAGES.ERROR.ACCESS_DENIED);
    await this.userRepository.destroy({ where: { id: userId } });
    await this.tokenService.updateRefreshToken(userId, null);
  }


  /**
 * Updates the password of a user.
 *
 * @param data - An object containing the user's email, mobile number, current password, and new password.
 * @returns A promise that resolves to an object with a success message.
 * @throws Throws an error if the user does not exist or if the current password is incorrect.
 */
  async updatePassword(data: UserDto.IChangePassword): Promise<{ message: string }> {
    const { email, mobileNo, password, newPassword } = data
    const User = await this.getUserDetail(email, mobileNo)

    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)

    if (!await Utilities.comparePassword(password, User.password)) throwError(MESSAGES.ERROR.INCORRECT_PASSWORD)
    const EncryptPassword = await Utilities.hashPassword(newPassword)

    await this.updateUser(email ? { email: email } : { mobileNo: mobileNo }, { password: EncryptPassword });
    return { message: 'Password changed successfully' };
  }

  /**
 * Change the user's password using a token.
 *
 * @param data - An object containing the token and new password.
 * @returns A promise that resolves to an object with a success message.
 * @throws Throws an error if the token is invalid, expired, or the user has already used it.
 */
  async forgotPassword(data: UserDto.IUpdatePassword): Promise<{ message: string }> {
    const { token, newPassword, confirmNewPassword} = data
    if(newPassword !== confirmNewPassword) throwError(MESSAGES.ERROR.PASSWORD_NOT_MATCHED)

    const DecyptToken = await Utilities.decryptCipher(token);

    const User = await this.userWithError({ id: DecyptToken })

    if (User.IsTokenUsed === true) throwError(MESSAGES.ERROR.OTPANDTOKENUSED)

    if (token !== User.token) throwError(MESSAGES.ERROR.INVALID_TOKEN)

    const EncryptPassword = await Utilities.hashPassword(newPassword);

    await this.updateUser({ id: DecyptToken }, { password: EncryptPassword, IsTokenUsed: true });

    return { message: 'Password changed successfully' };
  }

  async checkIfUserExists(
    data: UserDto.IUserRegisterDto | UserDto.IUserLoginDto
  ): Promise<User | null> {
    if (typeof data === 'string' || typeof data === 'number') {

      return null;
    }
    const { email, mobileNo } = data;

    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ email }, { mobileNo }],
      },
    });

    return user;
  }

  async updateUser(match: object, data: object): Promise<void> {
    await this.userRepository.update({ ...data }, { where: { ...match } });
  }


  async getUserDetail(email?: string, mobileNo?: number | string, employeeId?: string, fullName?: string): Promise<User | undefined> {
    const query: any = {};
    if (email) query.email = email;
    if (mobileNo) query.mobileNo = mobileNo;
    if (employeeId) query.employeeId = employeeId;
    if (fullName) query.fullName = fullName;

    const user = await this.userRepository.findOne({
      where: query,
      attributes: ['id', 'email', 'mobileNo', 'password', 'role' ,'isEmailVerified', 'isMobVerified'],
    });

    return user
  }

  async getUser(match: object): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...match }
    });

    return user;
  }

  async searchUser(
    params: UserDto.GetParamsRequestDto,
    filters: UserDto.GetFiltersDto
  ): Promise<{ list: Array<User>; totalCount: number }> {
    const { page, limit } = params;
    const { email, employeeId, fullName, mobileNo } = filters
    // const where: WhereOptions<User> = {
    //   ...(email && { email }),
    //   ...(userId && { userId }),
    //   ...(fullName && { fullName }),
    //   ...(mobileNo && { mobileNo: mobileNo.toString() }),
    // };
    const where: WhereOptions<User> = {};
    if (email) where.email = email;
    if (employeeId) where.id = employeeId;
    if (fullName) where.fullName = fullName;
    if (mobileNo) where.mobileNo = mobileNo;
    const { count, rows: users } = await this.userRepository.findAndCountAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: ['email', 'fullName', 'employeeId', 'mobileNo', 'role']
    });

    return { list: users, totalCount: count };
  }

  async doctorAvailability(
    params: UserDto.GetParamsRequestDto,
    filters: UserDto.GetFiltersDto,
  ): Promise<{ list: Array<User>; totalCount: number }> {
    const { page, limit } = params;
    const { email, employeeId, fullName } = filters;

    // Construct the where clause with role 'DOCTOR'
    const where: WhereOptions<User> = {
      role: 'DOCTOR'
    };

    // Add additional filters
    if (email) where.email = email;
    if (employeeId) where.employeeId = employeeId;
    if (fullName) where.fullName = fullName;

    const { count, rows: users } = await this.userRepository.findAndCountAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      attributes: ['availability', 'fullName', 'email', 'Sex', 'employeeId'] // Ensure 'availability' is correct
    });

    return { list: users, totalCount: count };
  }

  async changeAvaliablity(userId: string,
    data: UserDto.IUpdateTheAvaliablity
  ): Promise<{ message: string }> {
    const userType = await this.checkRole(userId)
    if (userType.role !== 'DOCTOR') throwError(MESSAGES.ROLE.ONLY_DOCTOR)
    await this.userRepository.update({
      Availability: data.Availability
    },
      { where: { id: userId } }
    )
    return { message: "Changed the status of avaliablity successfully" }
  }


  async userWithError(data: object): Promise<User> {
    const User = await this.getUser(data)
    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    return User;

  }

  async sendOTP(data: UserDto.ISendOneTimeCodeDto): Promise<object> {

    const User = await this.userWithError(data)
    const OTP = await this.generateOtp();
    // const EncryptOTP = await Utilities.encryptCipher(OTP);
    // await Twilio.sendMessage({
    //   otp: OTP,
    //   to: ""
    // })
    // await EmailService.sendMail('',OTP)
    const token = await Utilities.encryptCipher(User.id)
    const expirationDate = new Date(Date.now() + TIME.OTP.OTP_EXPIRES); // 5 minutes expiration

    await this.updateUser({ id: User.id }, { otp: Number(OTP), token: token, expirationDate, IsOtpUsed: false, IsTokenUsed: false });

    return { token };
  }

  async generateOtp(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  async verifyOTP(data: UserDto.IVerifyOneTimeCodeDto): Promise<object> {

    const { oneTimeCode, token } = data;

    const DecyptToken = await Utilities.decryptCipher(token);

    await this.IstokenAndOtpUsed(DecyptToken)

    await this.OtpError(DecyptToken, oneTimeCode, token)

    const Token = await Utilities.encryptCipher(DecyptToken)
    await this.updateUser({ id: DecyptToken }, { token: Token, IsTokenUsed: false, IsOtpUsed: true })


    return { Token };
  }

  async OtpError(DecyptToken: string, oneTimeCode: number, token: string): Promise<void> {
    const Otp = await this.findOtp(DecyptToken)
    if (!Otp) {
      throwError(MESSAGES.ERROR.DO_NOT_MATCHED);
    }
    if (oneTimeCode !== Otp.otp || token !== Otp.token)
      throwError(MESSAGES.ERROR.INCORRECT_OTP)
    if (new Date() > Otp.expirationDate)
      throwError(MESSAGES.ERROR.EXPIRES_OTP)
  }

  async IstokenAndOtpUsed(DecyptToken: string): Promise<void> {
    const OtpData = await this.findOtp(DecyptToken)
    if (OtpData.IsTokenUsed === true || OtpData.IsOtpUsed === true) {
      throwError(MESSAGES.ERROR.OTPANDTOKENUSED)
    }
  }

  async mobAndEmailVerification(data: UserDto.IVerifyMobileAndEmail): Promise<void> {
    const { mobileOtp,emailOtp, token } = data
    if(emailOtp !==mobileOtp) throwError(MESSAGES.ERROR.INCORRECT_OTP)
    const DecyptToken = await Utilities.decryptCipher(token);
    await this.IstokenAndOtpUsed(DecyptToken)

    await this.OtpError(DecyptToken, mobileOtp, token)

    await this.updateUser({ id: DecyptToken }, { isMobVerified: true, isEmailVerified: true, isTokenUsed: true })

  }



  async findOtp(decryptToken: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: decryptToken },
      attributes: ['id', 'email', 'otp', 'token', 'expirationDate', 'IsTokenUsed', 'IsOtpUsed'],
    });
  }

  async checkRole(userId: string) {
    const userType = await this.userRepository.findOne({
      where: { id: userId },
      attributes: ['role'],
    });
    return userType;
  }



}
