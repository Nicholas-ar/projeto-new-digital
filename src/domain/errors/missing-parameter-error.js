export class MissingParameterError extends Error {
  /**
   * @param {string} paramName - Parameter that is missing.
   */
  constructor(paramName) {
    super(`Missing parameter: ${paramName}`);
    this.name = 'MissingParameterError';
  }
}
