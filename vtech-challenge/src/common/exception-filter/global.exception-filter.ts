import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { BaseCustomeException } from '../abstract';
import { PostgresqlStatusCode } from '../enum/postgresql-status-code.enum';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor() {
    return;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response<
      any,
      Record<string, any>
    > = ctx.getResponse<Response>();
    let message = 'Internal server error';
    const errors: any[] = [];
    let status = 500;
    Logger.error(exception);

    if (exception instanceof BaseCustomeException) {
      message = exception.message;
      status = exception.status;
      exception.getError().forEach((e) => errors.push(e));

      response.status(status).json({ message, errors });
      return;
    } else if (exception instanceof QueryFailedError) {
      handleTypeOrmQueryFailedError(exception, response, errors);
    } else if (exception instanceof BadRequestException) {
      handleBadRequestException(exception, response, errors);
    } else if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();

      response.status(status).json({ message, errors });
      return;
    } else {
      Logger.error(exception);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        erros: [
          {
            message: 'Ops!, something went wrong, please connect administrator',
          },
        ],
      });
      return;
    }
  }
}

const handleBadRequestException = (
  exception: BadRequestException,
  response: Response<any, Record<string, any>>,
  errors: any[],
): void => {
  let message: string;
  let status: number;
  const respMsg = (exception.getResponse() as any).message;
  if (Array.isArray(respMsg) && respMsg.length >= 1) {
    const errMsg = respMsg[0];
    if (errMsg instanceof ValidationError) {
      message = 'Validation Error';
      status = exception.getStatus();
      const constrains = Object.values(errMsg?.constraints ?? [message]);
      constrains.forEach((constrain) =>
        errors.push({
          path: errMsg.property,
          message: constrain,
        }),
      );

      response.status(status).json({ message, errors });
      return;
    }
  }

  if ((exception.getResponse() as any).message) {
    message = 'Bad Request';
    status = exception.getStatus();
    errors.push({ message: exception.message });
    response.status(status).json({ message, errors });
    return;
  }
};

const handleTypeOrmQueryFailedError = (
  exception: QueryFailedError,
  response: Response<any, Record<string, any>>,
  errors: any[],
): void => {
  switch (exception.driverError.code) {
    case PostgresqlStatusCode.UNIQUE_VIOLATION: {
      const customErroMessage = customeDuplicateErrorMessage(
        exception.driverError.detail as string,
      );
      errors.push(customErroMessage);
      const message = 'Resource conflict error';
      const status = HttpStatus.CONFLICT;
      response.status(status).json({ message, errors });
      return;
    }
    case PostgresqlStatusCode.INVALID_TEXT_REPRESENTATION:
      response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: exception.message });
      return;
    case PostgresqlStatusCode.FOREIGN_KEY_VIOLATION:
      response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: exception.driverError.detail });
      return;
    case PostgresqlStatusCode.UNDEFINED_COLUMN:
      response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: exception.message });
      return;
    case PostgresqlStatusCode.NOT_NULL_VIOLATION:
      response.status(HttpStatus.BAD_REQUEST).json({
        message: `field '${(exception as any).column}' should not be null!`,
      });
      return;
  }
};

const customeDuplicateErrorMessage = (msg: string) => {
  const spliteMessage = msg.replace(/["("|")"]/g, '').split(/[\s|=]/g);
  return {
    path: spliteMessage[1],
    message: spliteMessage.slice(2).join(' ').replace('.', ''),
  };
};
