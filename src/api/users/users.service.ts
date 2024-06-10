/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { User, Otp } from '../../database/entities';
import { throwError } from "../../helpers/responseHadnlers";
import * as Utilities from '../../helpers/utilities.helper'
import Twilio from '../../helpers/twilio.helper'
import { TIME } from '../../constant';
import * as UserDto from './users.dto';
import { USER_REPOSITORY, MESSAGES, OTP_REPOSITORY } from 'src/constant';
import { Op } from "sequelize";


@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(OTP_REPOSITORY) private readonly otpRepository: typeof Otp,
  ) { }

  async register(
    data: UserDto.IUserRegisterDto
  ): Promise<{ message: string }> {
    if (data.mobileNo.toString().length !== 10) {
      throwError(MESSAGES.ERROR.INVALID_MOBILE_NO);
    }
    const user = await this.checkIfUserExists(data);
    if (user) throwError(MESSAGES.ERROR.USER_EXIST)
    data.password = await Utilities.hashPassword(data.password)
    await this.userRepository.create<User>({ ...data });
    return { message: "Registration successful" };
  }

  async login(data: UserDto.IUserLoginDto): Promise<{ message: string }> {
    const { email, mobileNo, password } = data
    const User = await this.getUserDetail(email, mobileNo)
    console.log("andera")
    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    console.log("user", User)
    if (!await Utilities.comparePassword(password, User.password)) throwError(MESSAGES.ERROR.INCORRECT_PASSWORD)
    // const jwtToken = await ;
    return { message: "login successfully" }

  }

  async updatePassword(data: UserDto.IUserLoginDto): Promise<{ message: string }> {
    const { email, mobileNo, password, newPassword } = data
    const User = await this.getUserDetail(email,mobileNo)
    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    if (!await Utilities.comparePassword(password, User.password)) throwError(MESSAGES.ERROR.INCORRECT_PASSWORD)
    const EncryptPassword = await Utilities.hashPassword(newPassword)
    await this.updateUser({ email: email }, { password: EncryptPassword });
    return { message: 'Password changed successfully' };
  }

  async changePassword(data: UserDto.IUpdatePassword): Promise<{ message: string }> {
    const { token, newPassword } = data
    const DecyptToken = await Utilities.decryptCipher(token);
    const User = await this.userWithError({ id: DecyptToken })
    if (token !== User.token) throwError(MESSAGES.ERROR.INVALID_TOKEN)
    const EncryptPassword = await Utilities.hashPassword(newPassword);
    await this.updateUser({ id: DecyptToken }, { password: EncryptPassword });
    return { message: 'Password changed successfully' };

  }

  async checkIfUserExists(
    data: UserDto.IUserRegisterDto | UserDto.IUserLoginDto
  ): Promise<User | null> {
    if (typeof data === 'string' || typeof data === 'number') {

      return null;
    }
    const { email, mobileNo } = data;

    // Checking if user exists by email or mobileNo
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

  async getUserDetail(email?: string, mobileNo?: number ): Promise<User | undefined> {
    const query: any = {};
    if (email) query.email = email;
    if (mobileNo) query.mobileNo = mobileNo;
    console.log("fdfd",mobileNo)
    console.log("query",query)
    const user = await this.userRepository.findOne({
      where: query,
      attributes: ['password', 'id', 'email', 'mobileNo'],
    });
    console.log("usssssssssseeeeeeeeeeeeeerrrrrrrrrrrrrrr",user)
    console.log(`User query result: ${user ? JSON.stringify(user) : 'undefined'}`);
    return user
  }




  async getUser(match: object): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...match }
    });

    return user;
  }

  async userWithError(data: object): Promise<User> {
    const User = await this.getUser(data)
    if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    return User;

  }

  async sendOTP(data: UserDto.ISendOneTimeCodeDto): Promise<any> {

    // const User = await this.getUser(data)
    // if (!User) throwError(MESSAGES.ERROR.USER_NOT_EXIST)
    const User = await this.userWithError(data)
    const OTP = await this.generateOtp();
    // const EncryptOTP = await Utilities.encryptCipher(OTP);
    // Twilio.sendMessage({  
    //   otp: OTP,
    //   to: ""
    // })
    const token = await Utilities.encryptCipher(User.id)
    const expirationDate = new Date(Date.now() + TIME.OTP.OTP_EXPIRES); // 5 minutes expiration
    await this.otpRepository.create<Otp>({
      code: OTP,
      userId: User.id,
      email: User.email,
      token: token,
      expirationDate,
      used: false,
    });

    return token;
  }

  async generateOtp(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  async verifyOTP(data: UserDto.IVerifyOneTimeCodeDto): Promise<any> {

    const { oneTimeCode, token } = data;
    const DecyptToken = await Utilities.decryptCipher(token);
    const Otp = await this.findOtp(DecyptToken)
    if (oneTimeCode !== Otp.code && token !== Otp.token)
      throwError(MESSAGES.ERROR.INCORRECT_OTP)
    if (new Date() > Otp.expirationDate)
      throwError(MESSAGES.ERROR.EXPIRES_OTP)
    const Token = await Utilities.encryptCipher(DecyptToken)
    await this.updateUser({ id: DecyptToken }, { token: Token })
    return Token;
  }


  async findOtp(decryptToken: string): Promise<Otp | undefined> {
    return this.otpRepository.findOne({
      where: { userId: decryptToken },
      attributes: ['userId', 'email', 'code', 'token', 'expirationDate']
    });
  }



}
