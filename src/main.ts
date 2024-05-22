import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = await app.listen(4000);
  console.log('in main', port);
}
bootstrap();
