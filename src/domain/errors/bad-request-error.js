import CustomError from './custom-error';

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default BadRequestError;
