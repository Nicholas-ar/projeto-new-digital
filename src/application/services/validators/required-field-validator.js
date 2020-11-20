import { MissingParameterError } from '../../../domain/errors';
/**
 * Validation service for required fields
 * @method validate
 */
export class RequiredFieldValidator {
  /**
   * @param {string} fieldName - Required field value set as string
   */
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  /**
   * Validates if the field exists returning null on success 
   * otherwise MissingParameterError 
   * @param {string} input 
   * @returns {null | MissingParameterError}
   */
  validate(input) {
    if (!input[this.fieldName])
      return new MissingParameterError(this.fieldName);
    return null
  }
}
