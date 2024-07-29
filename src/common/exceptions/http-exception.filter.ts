import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const stack = exception.stack;

    const exceptionResponse = exception.getResponse() as any;
    let message = exceptionResponse.message;
    if (typeof message === 'string') {
      message = [{ message }];
    }

    // if error from inputs
    const validationErrors = message.map((error) => ({
      value: error.value,
      property: error.property,
      constraints: error.constraints,
    }));
    if (validationErrors.length > 0) {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        message: validationErrors,
      });
    }

    // global error
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toString(),
      path: request.url,
      message: exception.message,
      stack: stack,
    });
  }
}
