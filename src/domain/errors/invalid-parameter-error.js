export class InvalidParameterError extends Error {
  constructor(paramName) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParameterError';
  }
}
