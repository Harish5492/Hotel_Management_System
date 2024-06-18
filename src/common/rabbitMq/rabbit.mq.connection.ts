import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { EM } from 'src/constant';

export const RabbitMqConnection: RabbitMQConfig = {
  uri: EM.RABBIT_MQ_CONNECTION_URL, // Use the correct RabbitMQ connection port
  exchanges: [
    {
      name: 'exchange_name', // You can customize this as needed
      type: 'topic',
    },
  ],
  connectionInitOptions: { wait: false },
};
