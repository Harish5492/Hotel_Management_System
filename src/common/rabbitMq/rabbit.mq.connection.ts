// rabbitmq.config.ts
import { ClientsModule, Transport } from '@nestjs/microservices';

export const RabbitMQConfig = ClientsModule.register([
  {
    name: 'RABBITMQ_CONNECTION',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:15672'],
      queue: 'otp_queue',
    },
  },
]);
