import { HttpStatus } from '@nestjs/common';
import { BaseCustomeException } from './abstract-base.exception';
import { ResourceNotfoundExceptionMessage } from '../enum/exception.message';
import { HttpMessage } from '../enum/http-message.enum';

export abstract class AbstractResourceNotFoundException extends BaseCustomeException {
  constructor(private resource: string, private identifier: string | number) {
    super(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  getError(): ResourceNotfoundExceptionMessage[] {
    const exceptionMessage = [];
    if (this.resource && this.identifier) {
      exceptionMessage.push({
        message: `Resource [${this.resource}] with identifier [${this.identifier}] not found`,
      });
    } else if (this.resource) {
      exceptionMessage.push({
        message: this.resource,
      });
    } else {
      exceptionMessage.push({
        message: HttpMessage.NOT_FOUND,
      });
    }
    return exceptionMessage;
  }
}
