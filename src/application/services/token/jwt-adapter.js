import jwt from 'jsonwebtoken';

/**
 * @interface TokenGenerator
 * @method generate
 */

/**
 * Adapter for the jwt dependency
 * @class
 * @implements {TokenGenerator}
 */
export class JwtAdapter {
  /**
   * 
   * @param {String} secret - String hash that is used to generate the JWT token
   */
  constructor(secret) {
    this.secret = secret;
  }

  /**
   * Generates a JWT given an index value and a secret
   * @param {String} value - Reference value that will be used for associating a JSON web token.
   * @returns {String} - Access token generated based on ID value
   */
  generate(value) {
    const accessToken = jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
