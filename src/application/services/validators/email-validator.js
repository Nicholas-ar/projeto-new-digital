import { InvalidParameterError } from '../../../domain/errors/invalid-parameter-error';
import { ValidatorAdapter } from '../../services/adapters/protocols/validator-adapter.definition';

/**
 * Email validator service that implements a validate method
 * @method validate
 */
export class EmailValidator {
  /**
   * Email validator service that returns true if the email is valid,
   * raising InvalidParameterError otherwise.
   * @param {ValidatorAdapter} emailValidatorAdapter
   */
  constructor(emailValidatorAdapter) {
    this._emailValidatorAdapter = emailValidatorAdapter;
    this.fieldName = 'email';
  }
  /**
   * Email validator service that returns true if the email is valid,
   * returning a InvalidParameterError otherwise.
   * @param {string} input
   * @returns {boolean | InvalidParameterError}
   */
  validate(input) {
    const isValid = this._emailValidatorAdapter.isValid(input[this.fieldName]);
    if (!isValid) return new InvalidParameterError(this.fieldName);
    return isValid;
  }
}
