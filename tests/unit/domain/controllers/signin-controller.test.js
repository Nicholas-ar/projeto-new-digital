import {
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
  HTTP_UNAUTHORIZED_401,
  HTTP_BAD_REQUEST_400,
} from '../../../../src/domain/helpers/http-helper';

import { MissingParameterError } from '../../../../src/domain/errors/missing-parameter-error';

import { SignInController } from '../../../../src/domain/controllers/signin-controller';

const makeAuthentication = () => {
  class AuthenticationStub {
    async authenticate(authentication) {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

const makeValidator = () => {
  class ValidatorStub {
    validate(input) {
      return null;
    }
  }
  return new ValidatorStub();
};

const makeSut = () => {
  const authenticationStub = makeAuthentication();
  const validatorStub = makeValidator();
  const sut = new SignInController(validatorStub, authenticationStub);
  return { sut, authenticationStub, validatorStub };
};

const makeFakeHttpRequest = () => ({
  body: {
    password: 'any_password',
    email: 'any_email@email.com',
  },
});

describe('SignInController', () => {
  describe('Authentication', () => {
    it('must call authenticate given valid data', async () => {
      const { sut, authenticationStub } = makeSut();
      const authenticateSpy = jest.spyOn(authenticationStub, 'authenticate');
      await sut.execute(makeFakeHttpRequest());
      expect(authenticateSpy).toHaveBeenCalledWith({
        email: 'any_email@email.com',
        password: 'any_password',
      });
    });
  });
  describe('Validator', () => {
    it('must call Validation with correct value', async () => {
      const { sut, validatorStub } = makeSut();
      const validateSpy = jest.spyOn(validatorStub, 'validate');
      const httpRequest = makeFakeHttpRequest();
      await sut.execute(httpRequest);
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });
  });

  it('must return a 200 given valid data', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.execute(makeFakeHttpRequest());
    expect(httpResponse).toEqual(HTTP_OK_200({ accessToken: 'any_token' }));
  });

  it('must return a 401 when invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'authenticate')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const httpResponse = await sut.execute(makeFakeHttpRequest());
    expect(httpResponse).toEqual(HTTP_UNAUTHORIZED_401());
  });

  it('must return a 500 if Authentication throws an error', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'authenticate')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const httpResponse = await sut.execute(makeFakeHttpRequest());
    expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
  });

  it('must return 400 if validation returns an error', async () => {
    const { sut, validatorStub } = makeSut();
    jest
      .spyOn(validatorStub, 'validate')
      .mockReturnValueOnce(new MissingParameterError('any_field'));
    const httpResponse = await sut.execute(makeFakeHttpRequest());
    expect(httpResponse).toEqual(
      HTTP_BAD_REQUEST_400(new MissingParameterError('any_field'))
    );
  });
});
