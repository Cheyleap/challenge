import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { ValidationErrorExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractValidationErrorException extends BaseCustomeException {
  constructor(private readonly key?: string, private readonly msg?: string) {
    super(HttpMessage.UNPROCESSABLE_ENTITY, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  getError(): ValidationErrorExceptionMessage[] {
    const error = [];
    error.push({
      path: this.key,
      message: this.msg,
    });
    return error;
  }
}
