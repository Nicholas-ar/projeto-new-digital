export class InvalidQueryError extends Error {
    constructor() {
      super('No matches found for this query');
      this.name = 'InvalidQueryError';
    }
  }
  