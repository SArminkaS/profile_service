import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models:[Student],
        define:
        {
          timestamps:false
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}