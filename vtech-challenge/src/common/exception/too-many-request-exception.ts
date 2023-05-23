import { AbstractTooManyRequestException } from '../abstract/abstract-too-many-request-exception';

export class TooManyRequestException extends AbstractTooManyRequestException {
    constructor(message: string) {
      super(message);
  }
}
