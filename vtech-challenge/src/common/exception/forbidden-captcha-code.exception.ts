
import { AbstractInvalidCaptchaCodeException } from '../abstract/abstract-captcha-code-invalid.exception';

export class ForbiddenCaptchaCodeException extends AbstractInvalidCaptchaCodeException {
  constructor(object?: object) {
    super(object);
  }
}
