import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { HttpMessage } from '../enum/http-message.enum';
import { BadRequestExceptionMessage } from '../enum/exception.message';

export abstract class AbstractInvalidCaptchaCodeException extends BaseCustomeException {
  constructor(private readonly object?: object) {
    super(HttpMessage.INVALID_CODE, HttpStatus.FORBIDDEN);
  }

  getError(): BadRequestExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      data: this.object,
    });
    return exceptionMessage;
  }
}
