import { EmailValidator } from '../../../../../src/application/services/validators/email-validator';
import { InvalidParameterError } from '../../../../../src/domain/errors';

const makeEmailValidator = () => {
  class EmailValidatorStub {
    isValid(email) {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = () => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidator(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('EmailValidator', () => {
  it('must return an InvalidParameterError if EmailValidatorAdapter returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'any_email@email.com' });
    expect(error).toEqual(new InvalidParameterError('email'));
  });

  it('must call EmailValidator with given email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email@email.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });

  it('must throw if EmailValidatorAdapter throws an error', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
