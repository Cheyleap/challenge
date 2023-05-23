import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { RequestTimeoutExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractRequestTimeoutException extends BaseCustomeException {
  constructor(private readonly resource: string) {
    super(HttpMessage.REQUEST_TIMEOUT, HttpStatus.REQUEST_TIMEOUT);
  }

  getError(): RequestTimeoutExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: `resource ${this.resource} timeout`,
    });
    return exceptionMessage;
  }
}
