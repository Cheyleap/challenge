import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { InternalServerErrorMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractInternalErrorException extends BaseCustomeException {
  constructor(msg?: string) {
    super(
      msg ?? HttpMessage.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  getError(): InternalServerErrorMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      messsage: this.message,
    });
    return exceptionMessage;
  }
}
