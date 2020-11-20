/**
 * Validator composit that receives a list of Validators, 
 * running the validate method of each one.
 * @method validate
 */
export class ValidatorServiceComposite {
  /**
   * @param {Array<ValidationService>} validators 
   */
  constructor(validators) {
    this._validators = validators;
  }

  /**
   * Loops through the list of validators validating the input value
   * @param {any} input 
   * @returns {null | Error}
   */
  validate(input) {
    for (const validation of this._validators) {
      const error = validation.validate(input);
      if (error) return error;
    }
    return null
  }
}
