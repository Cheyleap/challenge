import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { BadRequestExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractBadRequestException extends BaseCustomeException {
  constructor(
    private readonly path: string,
    private readonly customMsg: string,
  ) {
    super(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }

  getError(): BadRequestExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      path: this.path,
      message: this.customMsg,
    });
    return exceptionMessage;
  }
}
