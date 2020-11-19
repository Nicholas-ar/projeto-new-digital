import {
  HTTP_CREATED_201,
  HTTP_BAD_REQUEST_400,
  HTTP_SERVER_ERROR_500,
} from '../../../src/domain/helpers/http-helper';
import { EmailInUseError } from '../../../src/domain/errors/email-in-use-error';
import { MissingParameterError } from '../../../src/domain/errors/missing-parameter-error';
import { ServerError } from '../../../src/domain/errors/server-error';
import { SignUpController } from '../../../src/domain/controllers/signup-controller';

const makeAuthentication = () => {
  class AuthenticationStub {
    async authenticate() {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

const makeRespository = () => {
  class RepositoryStub {
    async create(userData) {
      return {
        _id: 1,
        email: 'valid_email@email.com',
        password: 'hashed_password',
      };
    }
    async retrieveByEmail(email) {
      return {
        _id: 1,
        email: 'valid_email@email.com',
        password: 'hashed_password',
      };
    }
    async updateAcessToken(id, token) {
      return {
        _id: 1,
        email: 'valid_email@email.com',
        password: 'hashed_password',
        accessToken: 'any_token',
      };
    }
  }
  return new RepositoryStub();
};

const makeValidator = () => {
  class ValidatorStub {
    validate(data) {
      return null;
    }
  }
  return new ValidatorStub();
};

const makeSut = () => {
  const repositoryStub = makeRespository();
  const authenticationStub = makeAuthentication();
  const validatorStub = makeValidator();
  const sut = new SignUpController(
    repositoryStub,
    authenticationStub,
    validatorStub
  );
  return { sut, repositoryStub, authenticationStub, validatorStub };
};

const makeHttpRequest = () => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

describe('Signup Controller', () => {
  describe('Validator', () => {
    it('must call the validate method with correct data', async () => {
      const { sut, validatorStub } = makeSut();
      const validateSpy = jest.spyOn(validatorStub, 'validate');
      const httpRequest = makeHttpRequest();
      await sut.createUser(httpRequest);
      expect(validateSpy).toHaveBeenCalledWith(httpRequest);
    });

    it('must return a 400 if validation returns an error', async () => {
      const { sut, validatorStub } = makeSut();
      jest
        .spyOn(validatorStub, 'validate')
        .mockReturnValueOnce(new MissingParameterError('parameter'));
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.createUser(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new MissingParameterError('parameter'))
      );
    });
  });

  describe('Repository', () => {
    it('must call the Repository create method with correct data', async () => {
      const { sut, repositoryStub } = makeSut();
      const createSpy = jest.spyOn(repositoryStub, 'create');
      const httpRequest = makeHttpRequest();
      await sut.createUser(httpRequest);
      expect(createSpy).toHaveBeenCalledWith(httpRequest);
    });

    it('must return 400 if no user is created', async () => {
      const { sut, repositoryStub } = makeSut();
      jest
        .spyOn(repositoryStub, 'create')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
      const httpRequest = {
        email: 'any_email@email.com',
        password: 'any_password',
      };
      const httpResponse = await sut.createUser(httpRequest);
      expect(httpResponse).toEqual(HTTP_BAD_REQUEST_400(new EmailInUseError()));
    });

    it('must return a 500 if Repository returns an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'create').mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
      const httpResponse = await sut.createUser(makeHttpRequest());
      expect(httpResponse).toEqual(
        HTTP_SERVER_ERROR_500(new ServerError(null))
      );
    });
  });

  describe('Authentication', () => {
    it('must call Authentication service with correct data', async () => {
      const { sut, authenticationStub } = makeSut();
      const authenticateSpy = jest.spyOn(authenticationStub, 'authenticate');
      const httpRequest = {
        email: 'any_email@email.com',
        password: 'any_password',
      };
      await sut.createUser(httpRequest);
      expect(authenticateSpy).toHaveBeenCalledWith({
        email: 'any_email@email.com',
        password: 'any_password',
      });
    });

    it('must return a new accessToken and 201 status code, given valid data', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        email: 'any_email@email.com',
        password: 'any_password',
      };
      const httpResponse = await sut.createUser(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_CREATED_201({ accessToken: 'any_token' })
      );
    });

    it('must return a 500 if Authentication throws an error', async () => {
      const { sut, authenticationStub } = makeSut();
      jest
        .spyOn(authenticationStub, 'authenticate')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        );
      const httpRequest = {
        email: 'any_email@email.com',
        password: 'any_password',
      };
      const httpResponse = await sut.createUser(httpRequest);
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });
});
