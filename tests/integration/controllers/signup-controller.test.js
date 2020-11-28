import {
  EmailInUseError,
  MissingParameterError,
  ServerError,
} from '../../../src/domain/errors';
import { SignUpController } from '../../../src/application/controllers';
import {
  HTTP_BAD_REQUEST_400,
  HTTP_SERVER_ERROR_500,
  HTTP_CREATED_201,
} from '../../../src/application/helpers/http-helper';

const makeAuthentication = () => {
  class AuthenticationStub {
    async authenticate() {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

const makeHasherService = () => {
  class HasherServiceStub {
    async hash(value) {
      return new Promise((resolve) => resolve('hashed_password'));
    }
    async compare(hash, value) {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HasherServiceStub();
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
  const hasherServiceStub = makeHasherService();
  const sut = new SignUpController(
    repositoryStub,
    authenticationStub,
    validatorStub,
    hasherServiceStub
  );
  return {
    sut,
    repositoryStub,
    authenticationStub,
    validatorStub,
    hasherServiceStub,
  };
};

const makeHttpRequest = () => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password',
  },
});

const makeHashedHttpRequest = () => ({
  email: 'any_email@email.com',
  password: 'hashed_password',
  isAdmin: false,
});

describe('Signup Controller', () => {
  describe('Validator', () => {
    it('must call the validate method with correct data', async () => {
      const { sut, validatorStub } = makeSut();
      const validateSpy = jest.spyOn(validatorStub, 'validate');
      const httpRequest = makeHttpRequest();
      await sut.execute(httpRequest);
      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('must return a 400 if validation returns an error', async () => {
      const { sut, validatorStub } = makeSut();
      jest
        .spyOn(validatorStub, 'validate')
        .mockReturnValueOnce(new MissingParameterError('parameter'));
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.execute(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new MissingParameterError('parameter'))
      );
    });
  });

  describe('HasherService', () => {
    it('must call hash with correct data', async () => {
      const { sut, hasherServiceStub } = makeSut();
      const hashSpy = jest.spyOn(hasherServiceStub, 'hash');
      const httpRequest = makeHttpRequest();
      await sut.execute(httpRequest);
      expect(hashSpy).toHaveBeenCalledWith('any_password');
    });

    it('must return 500 if hash throws', async () => {
      const { sut, hasherServiceStub } = makeSut();
      jest.spyOn(hasherServiceStub, 'hash').mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
      const httpResponse = await sut.execute(makeHashedHttpRequest());
      expect(httpResponse).toEqual(
        HTTP_SERVER_ERROR_500(new ServerError(null))
      );
    });
  });

  describe('Repository', () => {
    it('must call the Repository create method with correct data', async () => {
      const { sut, repositoryStub } = makeSut();
      const createSpy = jest.spyOn(repositoryStub, 'create');
      await sut.execute(makeHttpRequest());
      expect(createSpy).toHaveBeenCalledWith(makeHashedHttpRequest());
    });

    it('must return 400 if no user is created', async () => {
      const { sut, repositoryStub } = makeSut();
      jest
        .spyOn(repositoryStub, 'create')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
      const httpResponse = await sut.execute(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_BAD_REQUEST_400(new EmailInUseError()));
    });

    it('must return a 500 if Repository returns an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'create').mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
      const httpResponse = await sut.execute(makeHttpRequest());
      expect(httpResponse).toEqual(
        HTTP_SERVER_ERROR_500(new ServerError(null))
      );
    });
  });

  describe('Authentication', () => {
    it('must call Authentication service with correct data', async () => {
      const { sut, authenticationStub } = makeSut();
      const authenticateSpy = jest.spyOn(authenticationStub, 'authenticate');
      await sut.execute(makeHttpRequest());
      expect(authenticateSpy).toHaveBeenCalledWith({
        email: 'any_email@email.com',
        password: 'any_password',
      });
    });

    it('must return a new accessToken and 201 status code, given valid data', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.execute(makeHttpRequest());
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
      const httpResponse = await sut.execute(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });
});
