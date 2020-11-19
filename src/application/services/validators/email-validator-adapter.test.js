import { EmailValidatorAdapter } from './email-validator-adapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail() {
    return true;
  },
}));

const makeSut = () => {
  return new EmailValidatorAdapter();
};

describe('EmailValidatorAdapter', () => {
  it('must call Validator with correct value', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@email.com');
    expect(isEmailSpy).toHaveBeenLastCalledWith('any_email@email.com');
  });
  
  it('must return false when Validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@email.com');
    expect(isValid).toBe(false);
  });

  it('must return true when Validator returns true', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);
    const isValid = sut.isValid('valid_email@email.com');
    expect(isValid).toBe(true);
  });
});
