import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Internal server error, please try again later'
        : (exception as any).message || 'An error occurred';

    response.status(status).json({
      statusCode: status,
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
