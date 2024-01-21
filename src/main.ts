import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: '23',
      resave: false,
      saveUninitialized: false,
    }),
  );
  function isValidCreatedAt(created_at) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    return typeof created_at === 'string' && dateRegex.test(created_at);
}
console.log(isValidCreatedAt('9-1-1'))
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  );

  await app.listen(3000,'0.0.0.0');
}
bootstrap();
