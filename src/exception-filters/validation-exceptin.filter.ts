
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'sequelize'

@Catch(ValidationError)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(404)
      .json({
        error: exception.message,
        message: exception.errors
      });
  }
}