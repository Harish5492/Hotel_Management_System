/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { User } from '../../database/entities/user.entity'; 
import { throwError } from "../../helpers/responseHadnlers";
import * as Utilities from '../../helpers/utilities.hleper'
import * as UserDto from './users.dto';
import { USER_REPOSITORY,MESSAGES } from 'src/constant';
import { Op } from "sequelize";


@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async register(
    data: UserDto.IUserRegisterLoginDto
  ): Promise<{ message: string }> {
    const user = await this.checkIFUserExists(data);
    if(user) throwError(MESSAGES.ERROR.USER_EXIST)
    data.password = await Utilities.hashPassword(data.password)
    await this.userRepository.create<User>({ ...data });
    return { message: "Registration successful" };
  }

  // async login(data:UserDto.IUserRegisterLoginDto)

  async getUserWithEmailOrMobile(
    data: UserDto.IUserRegisterLoginDto | UserDto.IResendOneTimeCodeDto,
  ): Promise<User> {
    const { loginType, email, mobileNo } = data;
    /** changing match query accoring to the 'loginType' key */
    let $match: object = { email };
    if (loginType === 'MOBILE') $match = { mobileNo };
    /** checking user, if exists or not */
    const user = await this.userRepository.findOne({
      where: { ...$match },
    });

    return user;
  }

  async checkIFUserExists(
    data: UserDto.IUserRegisterLoginDto | UserDto.IResendOneTimeCodeDto,
  ): Promise<User> {
    const { email, mobileNo } = data;
    /** checking user, if exists or not */
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ email }, { mobileNo }], // Check for either email or mobileNo
      },
    });
  
    return user;
  }
  
}
