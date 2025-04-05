import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeuqelizeValidationFilter } from './exception-filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{host: '127.0.0.1', port:3002}
    },
  );
  app.useGlobalFilters(new SeuqelizeValidationFilter());
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  await app.listen()
}
bootstrap();
