import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { UnauthorizedExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractUnauthorizedException extends BaseCustomeException {
  constructor() {
    super(HttpMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  getError(): UnauthorizedExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: HttpMessage.UNAUTHORIZED,
    });
    return exceptionMessage;
  }
}
