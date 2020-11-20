import argon2 from 'argon2';
/**
 * Adapter for the Argon2 module. Allows hashing and comparing passwords.
 */
export class Argon2Adapter {
  /**
   * Method that hashes a password string
   * @param {string} value - Password string that will be hashed.
   * @returns {string} hash - Hashed value that is returned as string.
   */
  async hash(value) {
    const hash = await argon2.hash(value);
    return hash;
  }

  /**
   * Method that compares a hashed value with password string
   * @param {string} value - Password string that will be hashed.
   * @returns {boolean} isValid - Returns true if the hash matches the value. False otherwise.
   */
  async compare(hash, value) {
    const isValid = await argon2.verify(hash, value);
    return isValid;
  }
}
