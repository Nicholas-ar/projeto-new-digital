import { ValidationService } from "../protocols";

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
   * @param {any} input 
   */
  validate(input) {
    for (const validation of this._validators) {
      const error = validation.validate(input);
      if (error) return error;
    }
    return null;
  }
}
