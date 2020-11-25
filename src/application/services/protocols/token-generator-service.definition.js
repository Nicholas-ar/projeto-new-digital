/**
 * @abstract
 * @name TokenGeneratorService
 * @method generate
 */
export class TokenGeneratorService {
  constructor() {
    throw new Error('Not implemented');
  }

  /**
   * Generates a JWT given an index value and a secret
   * @param {String} value - Reference value that will be used for associating a JSON web token.
   * @returns {String} - Access token generated based on ID value
   */
  generate(value) {
    throw new Error('Not implemented');
  }
}
