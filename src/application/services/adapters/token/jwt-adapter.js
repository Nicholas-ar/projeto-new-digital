import jwt from 'jsonwebtoken';

// TODO: Pass these env variables to a single file that will require the dotenv.config
require('dotenv').config();
/**
 * Adapter for the jwt dependency
 * @class
 * @method generate
 */
export class JwtAdapter {
  constructor() {
    // TODO refactor this
    this.secret = process.env.JWT_SECRET;
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

  /**
   * Generates a JWT given an index value and a secret
   * @param {String} value - JSON web token.
   * @returns {String | Object} - Access token generated based on ID value
   */
  decipher(value) {
    const result = jwt.verify(value, this.secret);
    return result;
  }
}
