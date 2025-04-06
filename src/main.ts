import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeuqelizeValidationFilter } from './exception-filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods:'GET,POST,PUT,DELETE'
  })
  app.useGlobalFilters(new SeuqelizeValidationFilter());
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  await app.listen(process.env.PORT ?? 3001, process.env.HOST ?? 'localhost')
}
bootstrap();