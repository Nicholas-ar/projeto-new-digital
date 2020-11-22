/**
 * @abstract
 * @name ValidatorAdapter
 * @method validate
 */
export class ValidatorAdapter {
  constructor() {
    throw Error('Not implemmented');
  }

  /**
   * Validates the given input retuning a boolean.
   * @param {string} input
   * @returns {boolean}
   */
  isValid(input) {
    throw Error('Not implemmented');
  }
}
