/**
 * @abstract
 * @name TokenService
 * @method generate
 */
export class TokenService {
  constructor() {
    this._secret = String;
    throw new Error('Not implemented');
  }

  /**
   * Generates a token given a value
   * @param {String} value - Reference value that will be used for associating a JSON web token.
   * @returns {String} - Access token generated based on ID value
   */
  generate(value) {
    throw new Error('Not implemented');
  }

  /**
   * Decodes a token given a value
   * @param {String} value Token
   * @returns {String | Object} - Access token generated
   */
  decipher(value) {
    throw new Error('Not implemented');
  }
}
