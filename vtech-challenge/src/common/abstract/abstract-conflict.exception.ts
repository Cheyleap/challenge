import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { ConflictResourceExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractConflictResourceException extends BaseCustomeException {
  constructor(
    private readonly path: string,
    private readonly customMsg: string,
  ) {
    super(HttpMessage.CONFLICT, HttpStatus.CONFLICT);
  }

  getError(): ConflictResourceExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      path: this.path,
      message: this.customMsg,
    });
    return exceptionMessage;
  }
}
