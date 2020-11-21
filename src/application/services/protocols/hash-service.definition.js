/**
 * @abstract
 * @name HasherService
 * @method hash
 * @method compare
 */
export class HasherService {
  constructor() {
    throw new Error('Not implemented');
  }
  
  /**
   * Method that hashes a password string
   * @param {string} value - Password string that will be hashed.
   * @returns {Promise<string>} - Hashed value that is returned as string.
   */
  async hash(value) {
    throw new Error('Not implemented');
  }

  /**
   * Method that compares a hashed value with password string
   * @param {string} hash - Hashed Password string that will be used for comparison.
   * @param {string} value - Plain text Password string that will be used for comparison
   * @returns {Promise<boolean>} True if the hash matches the value. False otherwise.
   */
  async compare(hash, value) {
    throw new Error('Not implemented');
  }
}
