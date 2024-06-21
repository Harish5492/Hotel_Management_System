import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EM } from 'src/constant';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EM.JWT.ACCESS_SECRET,
    });
  }

  validate(payload: { userId: string }) {
    return payload;
    // }
    // async validate(payload: { userId: string }) {
    //   const user = await this.userService.getUserDetail({ id: payload?.userId });

    //   if (user && user?.status === 'BLOCKED') {
    //     // throwForbidden()
    //     throw new HttpException(
    //       {
    //         statusCode: 403,
    //         isLogout: true,
    //       },
    //       HttpStatus.FORBIDDEN,
    //     );
    //   }
    //   return payload;
    // }
  }
}
