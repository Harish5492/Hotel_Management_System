/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { User } from '../../database/entities/user.entity'; 
import * as UserDto from './users.dto';
import { USER_REPOSITORY } from 'src/constant';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async register(
    data: UserDto.IUserRegisterLoginDto
  ): Promise<{ message: string }> {
    await this.userRepository.create<User>({ ...data });
    return { message: "Registration successful" };
  }
}
