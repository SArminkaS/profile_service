import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models:[Student],
        define:
        {
          timestamps:false
        }
      }),
      inject: [ConfigService]
    }),
    StudentModule
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}