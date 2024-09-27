import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  initMiddlewares(app);
  initSwaggerDocs(app); // Initialize Swagger before listening to ensure it's set up
  await app.listen(3307);
  console.log('Server is running on http://localhost:3307');
}
async function initMiddlewares(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });
  app.use(cors());
}
async function initSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User')
    .setDescription('API Documentation.')
    .setVersion('1.0')
    .addTag('Backend')
    .addServer('http://localhost:3307') // Ensure the server URL matches the actual server port
    .setLicense('MIT Licence', 'http://www.example.com')
    .setContact(
      'Harish Rana',
      'http://www.example.com',
      'harishrana5492@gmail.com',
    )
    .addBearerAuth()
    .build();

  /** creating a documentation */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs', app, document);
}

bootstrap();
