import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { ValidationFilter } from './exception-filters/validation-exceptin.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new ValidationFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
