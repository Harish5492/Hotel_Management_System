import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import UsersService from 'src/api/users/users.service';
import * as utilities from '../../helpers/utilities.hleper';

@Injectable()
export class RabbitMqService {
  constructor(
    private readonly rabbitMq: AmqpConnection,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public publishMessage(
    exchange: string,
    routingKey: string,
    channel: string,
    data: string,
  ) {
    this.rabbitMq.publish(exchange, routingKey, data);
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'generate-otp',
    queue: 'generate-otp-queue',
    queueOptions: {
      channel: 'channel-1',
    },
  })
  private async generateOneTimePassword(data: string) {
    const { userId } = JSON.parse(data);
    const oneTimePass = utilities.generateOneTimeCode(6);
    oneTimePass.otp = await utilities.encryptCipher(oneTimePass.otp);
    await this.usersService.updateUser({ id: userId }, { ...oneTimePass });
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'update-refresh-token',
    queue: 'update-refresh-token-queue',
    queueOptions: {
      channel: 'channel-1',
    },
  })
  private async updateRefreshToken(data: string) {
    const { userId, refreshToken } = JSON.parse(data);
    this.tokensService.updateRefreshToken(userId, refreshToken);
  }
}
