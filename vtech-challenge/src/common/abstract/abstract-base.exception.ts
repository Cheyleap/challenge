import { ExceptionMessage } from '../enum/exception.message';

export abstract class BaseCustomeException extends Error {
  constructor(mes: string, status: number) {
    super(mes);
    this.status = status;
  }

  readonly status: number;

  abstract getError(): ExceptionMessage[];
}
