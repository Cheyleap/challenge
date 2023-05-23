import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { ForbiddenExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractForbiddenException extends BaseCustomeException {
  constructor() {
    super(HttpMessage.FORBIDDEN, HttpStatus.FORBIDDEN);
  }

  getError(): ForbiddenExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: HttpMessage.FORBIDDEN,
    });
    return exceptionMessage;
  }
}
