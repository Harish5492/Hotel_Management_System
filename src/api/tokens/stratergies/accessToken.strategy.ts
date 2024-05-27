import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UsersService from 'src/api/users/users.service';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ahrish@43o4u39%kasdf',
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.userService.getUserDetail({ id: payload?.userId });

    if (user && user?.status === 'BLOCKED') {
      // throwForbidden()
      throw new HttpException(
        {
          statusCode: 403,
          isLogout: true,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return payload;
  }
}
