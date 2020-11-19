import { MissingParameterError } from '../../../domain/errors';

export class RequiredFieldValidator {
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  validate(input) {
    if (!input[this.fieldName])
      return new MissingParameterError(this.fieldName);
    return null
  }
}
