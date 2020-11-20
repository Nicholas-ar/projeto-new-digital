import validator from 'validator';

export class EmailValidatorAdapter {
  /**
   * Email validator adapter for the 'validator' package
   * @param {string} email
   */
  isValid(email) {
    return validator.isEmail(email);
  }
}
