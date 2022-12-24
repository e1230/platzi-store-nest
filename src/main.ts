import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //eliminar campos extra que no esten el dto
      forbidNonWhitelisted: true, //alertar que esta ingresando campos prohibidos
    }),
  );
  await app.listen(3000);
}
bootstrap();
