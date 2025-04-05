import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './exception-filters/validation-exceptin.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
