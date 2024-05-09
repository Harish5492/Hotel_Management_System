/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import User from '../../entities'
import { KYC_REPOSITORY, MESSAGES, USER_REPOSITORY } from 'src/constant';
@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    ) 

}
