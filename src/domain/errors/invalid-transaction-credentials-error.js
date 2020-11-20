export class InvalidTransactionCredentialsError extends Error {
    constructor() {
      super('Invalid transaction credentials');
      this.name = 'InvalidTransactionCredentialsError';
    }
  }
  