import { ValidatorComposite } from '../../../../../src/application/services/validators/validator-composite';
import { MissingParameterError } from '../../../../../src/domain/errors';
const makeSut = () => {
  const validatorStubs = [makeValidator(), makeValidator()];
  const sut = new ValidatorComposite(validatorStubs);
  return { sut, validatorStubs };
};

const makeValidator = () => {
  class ValidatorStub {
    validate(input) {
      return null;
    }
  }
  return new ValidatorStub();
};

describe('ValidatorComposite', () => {
  it('must throw an error if any of validators throws', () => {
    const { sut, validatorStubs } = makeSut();
    jest
      .spyOn(validatorStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParameterError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParameterError('field'));
  });

  it('must return the first error if more than one validation fails', () => {
    const { sut, validatorStubs } = makeSut();
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new Error());
    jest
      .spyOn(validatorStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParameterError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new Error());
  });

  it('must return null if validation succeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeNull();
  });
});
