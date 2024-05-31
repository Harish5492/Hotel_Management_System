/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { User, Otp } from '../../database/entities';
import { throwError } from "../../helpers/responseHadnlers";
import * as Utilities from '../../helpers/utilities.hleper'
import Twilio from '../../helpers/twilio.helper'
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
    data: UserDto.IUserRegisterLoginDto
  ): Promise<{ message: string }> {
    const user = await this.checkIfUserExists(data);
    if (user) throwError(MESSAGES.ERROR.USER_EXIST)
    data.password = await Utilities.hashPassword(data.password)
    await this.userRepository.create<User>({ ...data });
    return { message: "Registration successful" };
  }

  // async login(data:UserDto.IUserRegisterLoginDto)

  // async getUserWithEmailOrMobile(
  //   data: UserDto.IUserRegisterLoginDto | UserDto.IResendOneTimeCodeDto,
  // ): Promise<User> {
  //   const { loginType, email, mobileNo } = data;
  //   /** changing match query accoring to the 'loginType' key */
  //   let $match: object = { email };
  //   if (loginType === 'MOBILE') $match = { mobileNo };
  //   /** checking user, if exists or not */
  //   const user = await this.userRepository.findOne({
  //     where: { ...$match },
  //   });

  //   return user;
  // }

  async  checkIfUserExists(
    data: UserDto.IUserRegisterLoginDto | UserDto.IResendOneTimeCodeDto
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

  async getUserDetail(match: object,): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...match },
      attributes: { exclude: ['otp', 'otpExpires', 'password', 'refreshToken', 'id'] }, // Specify additional attributes here
      include: [
        {
          model: User
        }
      ]
    });

    return user;
  }

  async getUser(match: object): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...match },
    });

    return user;
  }

 async sendOTP(data: UserDto.IUserRegisterLoginDto | UserDto.ISendOneTimeCodeDto): Promise<{ message: string }> {
  let source: string | number;

  if ('email' in data) {
    source = data.email;
  } else if ('mobileNo' in data) {
    source = data.mobileNo;
  } else {
    throw new Error('Email or Mobile is required');
  }

  console.log("before user");
  const user = typeof source === 'string'
  ? await this.checkIfUserExists({
    email: source,
    loginType: ""
  })
  : await this.checkIfUserExists({
    mobileNo: source,
    loginType: ""
  });

  console.log("after user");

  if (!user) {
    throwError(MESSAGES.ERROR.USER_NOT_FOUND);
  }

  const OTP = await this.generateOtp();
  const EncryptOTP = await Utilities.encryptCipher(OTP);
  
  // Twilio.sendMessage({  
  //   otp: OTP,
  //   to: ""
  // })

  const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
  
  const Data = await this.otpRepository.create<Otp>({
    code: EncryptOTP,
    // userId: source,
    expirationDate,
    used: false,
  });

  console.log("otp model is", Data);

  return { message: 'Otp Sent' };
}


  async generateOtp(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  


}
