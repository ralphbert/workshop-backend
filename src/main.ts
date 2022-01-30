import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { delayMiddleware } from './lib/delay.middleware';
import { errorMiddleware } from './lib/error.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Workshop Backend')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(delayMiddleware);
  app.use(errorMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
