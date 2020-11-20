export class OrderNotFoundError extends Error {
  constructor() {
    super('No order was found');
    this.name = 'OrderNotFoundError';
  }
}
