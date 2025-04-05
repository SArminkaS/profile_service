
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'sequelize'

@Catch(ValidationError)
export class SeuqelizeValidationFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(400)
      .json({
        error: exception.message,
        message: exception.errors
      });
  }
}