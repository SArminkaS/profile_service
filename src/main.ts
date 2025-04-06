import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeuqelizeValidationFilter } from './exception-filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.enableCors()
console.log(configService.get('CORS_ORIGIN'))
  app.useGlobalFilters(new SeuqelizeValidationFilter());
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  await app.listen(configService.get('PORT') ?? 3001, configService.get<string>('HOST') ?? 'localhost')
}
bootstrap();