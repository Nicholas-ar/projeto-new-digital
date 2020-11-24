import validator from 'validator';

/**
 * Email validator adapter for the 'validator' package
 * @method isValid
 */
export class ValidatorEmailAdapter {
  /**
   * Validates the given email using 'isEmail' method from 'validator'.
   * @param {string} email
   * @returns {boolean}
   */
  isValid(email) {
    return validator.isEmail(email);
  }
}
