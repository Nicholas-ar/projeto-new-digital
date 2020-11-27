export class AccessDeniedError extends Error {
  constructor() {
    super('Forbidden access');
    this.name = 'ForbiddenError';
  }
}
