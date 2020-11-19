export class ValidatorComposite {
  constructor(validators) {
    this._validators = validators;
  }

  validate(input) {
    for (const validation of this._validators) {
      const error = validation.validate(input);
      if (error) return error;
    }
    return null
  }
}
