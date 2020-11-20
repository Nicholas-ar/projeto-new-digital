export class InvalidParameterError extends Error {
  /**
   * @param {string} paramName - Parameter that is invalid
   */
  constructor(paramName) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParameterError';
  }
}
