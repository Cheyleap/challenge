import { AbstractInternalErrorException } from '../abstract';

export class InternalErrorException extends AbstractInternalErrorException {
  constructor(msg?: string) {
    super(msg);
  }
}
