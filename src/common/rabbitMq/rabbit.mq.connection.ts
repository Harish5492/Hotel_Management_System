import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const RabbitMqConnection: RabbitMQConfig = {
  uri: 'amqp://localhost:5672', // Use the correct RabbitMQ connection port
  exchanges: [
    {
      name: 'exchange_name', // You can customize this as needed
      type: 'topic',
    },
  ],
  connectionInitOptions: { wait: false },
};
