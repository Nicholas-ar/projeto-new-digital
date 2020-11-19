import {
  HTTP_CREATED_201,
  HTTP_BAD_REQUEST_400,
  HTTP_SERVER_ERROR_500,
} from '../../../src/domain/helpers/http-helper';
import { EmailInUseError } from '../../../src/domain/errors/email-in-use-error';
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

const makeSut = () => {
  const repositoryStub = makeRespository();
  const authenticationStub = makeAuthentication();
  const sut = new SignUpController(repositoryStub, authenticationStub);
  return { sut, repositoryStub, authenticationStub };
};

describe('Signup Controller', () => {
  it.todo('must call the Validation validate method with correct data');
  
  it.todo('must return a 400 if validation returns an error');
  
  it('must call the repository create method with correct data', async () => {
    const { sut, repositoryStub } = makeSut();
    const createSpy = jest.spyOn(repositoryStub, 'create');
    const httpRequest = {
      email: 'any_email@email.com',
      password: 'any_password',
    };
    await sut.createUser(httpRequest);
    expect(createSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password',
    });
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

  it.todo('must return a 500 if Repository returns an error');

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
