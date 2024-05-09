import { Post,Controller,Body,HttpException,Get,Req } from "@nestjs/common";
import {UserService} from './users.service'
import * as usersDto from './users.dto'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'

@ApiTags('USERS')
@Controller('./users')
