import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { TokensService } from './token.service';
import { RefreshTokenGuard } from '../../common/guard/refreshToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { successResponse } from '../../helpers/responseHadnlers';
import { MESSAGES } from 'src/constant';

@ApiTags('TOKENS')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request | any) {
    try {
      const userId = req.user['userId'];
      const refreshToken = req.user['refreshToken'];
      const data = await this.tokensService.refreshTokens(userId, refreshToken);
      return successResponse(MESSAGES.USER.REFRESH_TOKEN, data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
