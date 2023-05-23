import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { ToManyRequestExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractTooManyRequestException extends BaseCustomeException {
  constructor(private readonly resource: string) {
    super(HttpMessage.TO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS);
  }

  getError(): ToManyRequestExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: `${HttpMessage.TO_MANY_REQUESTS}`,
    });
    return exceptionMessage;
  }
}
