export class ServerError extends Error {
  /**
   * @param {string} stack - Error stack
   */
  constructor(stack) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
  }
}
