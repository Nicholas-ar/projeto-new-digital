import argon2 from 'argon2';

/**
 * Adapter for the Argon2 module. Allows hashing and comparing passwords.
 */
export class Argon2Adapter {
  /**
   * Method that hashes a password string
   * @param {string} value - Password string that will be hashed.
   * @returns {Promise<string>} - Hashed value that is returned as string.
   */
  async hash(value) {
    return await argon2.hash(value);
  }

  /**
   * Method that compares a hashed value with password string
   * @param {string} hash - Hashed Password string that will be used for comparison.
   * @param {string} value - Plain text Password string that will be used for comparison
   * @returns {Promise<boolean>} True if the hash matches the value. False otherwise.
   */
  async compare(hash, value) {
    return await argon2.verify(hash, value);
  }
}
