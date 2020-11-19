import { InvalidParameterError } from '../../../domain/errors/invalid-parameter-error';

export class EmailValidator {
  constructor(emailValidator) {
    this.emailValidator = emailValidator;
    this.fieldName = 'email';
  }
  validate(input) {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) return new InvalidParameterError(this.fieldName);
  }
}
