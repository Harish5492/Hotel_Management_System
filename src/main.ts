import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  initSwaggerDocs(app); // Initialize Swagger before listening to ensure it's set up
  await app.listen(3307);
  console.log('Server is running on http://localhost:3307');
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
