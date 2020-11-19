import { DatabaseUserAuthentication } from './database-user-authentication';

const makeRespository = () => {
  class RepositoryStub {
    async create(userData) {
      return {
        _id: 'an_id',
        email: 'valid_email@email.com',
        password: 'hashed_password',
      };
    }
    async retrieveByEmail(email) {
      return {
        _id: 'an_id',
        email: 'valid_email@email.com',
        password: 'hashed_password',
      };
    }
    async updateAccessToken(id, token) {
      return {
        _id: 'an_id',
        email: 'valid_email@email.com',
        password: 'hashed_password',
        accessToken: 'any_token',
      };
    }
  }
  return new RepositoryStub();
};

const makeHashComparerServiceStub = () => {
  class HashComparerServiceStub {
    async compare(password, hashedPassword) {
      return true;
    }
  }

  return new HashComparerServiceStub();
};

const makeTokenGeneratorServiceStub = () => {
  class TokenGeneratorServiceStub {
    async generate(id) {
      return 'any_token';
    }
  }

  return new TokenGeneratorServiceStub();
};

const makeAuthenticationData = () => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

const makeSut = () => {
  const repositoryStub = makeRespository();
  const hashComparerServiceStub = makeHashComparerServiceStub();
  const tokenGeneratorServiceStub = makeTokenGeneratorServiceStub();
  const sut = new DatabaseUserAuthentication(
    repositoryStub,
    hashComparerServiceStub,
    tokenGeneratorServiceStub
  );
  return {
    sut,
    repositoryStub,
    hashComparerServiceStub,
    tokenGeneratorServiceStub,
  };
};

describe('DatabaseUserAuthentication', () => {
  describe('Repository', () => {
    it('must call retrieveByEmail with correct data', async () => {
      const { sut, repositoryStub } = makeSut();
      const retrieveByEmailSpy = jest.spyOn(repositoryStub, 'retrieveByEmail');
      await sut.authenticate(makeAuthenticationData());
      expect(retrieveByEmailSpy).toHaveBeenCalledWith('any_email@email.com');
    });

    it('must return null if no user is found', async () => {
        const { sut, repositoryStub } = makeSut();
        jest
          .spyOn(repositoryStub, 'retrieveByEmail')
          .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
        const accessToken = await sut.authenticate(makeAuthenticationData());
        expect(accessToken).toBeNull();
      });

    it('must throw an error if retrieveByEmail throws', async () => {
      const { sut, repositoryStub } = makeSut();
      jest
        .spyOn(repositoryStub, 'retrieveByEmail')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        );
      const result = sut.authenticate(makeAuthenticationData());
      await expect(result).rejects.toThrow();
    });
  });
  describe('HashComparerService', () => {
    it('must call compare with correct data', async () => {
      const { sut, hashComparerServiceStub } = makeSut();
      const compareSpy = jest.spyOn(hashComparerServiceStub, 'compare');
      await sut.authenticate(makeAuthenticationData());
      expect(compareSpy).toHaveBeenCalledWith(
        'any_password',
        'hashed_password'
      );
    });

    it('must return null if compare returns false', async () => {
      const { sut, hashComparerServiceStub } = makeSut();
      jest
        .spyOn(hashComparerServiceStub, 'compare')
        .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
      const accessToken = await sut.authenticate(makeAuthenticationData());
      expect(accessToken).toBeNull();
    });

    it('must throw an error if compare throws', async () => {
      const { sut, hashComparerServiceStub } = makeSut();
      jest
        .spyOn(hashComparerServiceStub, 'compare')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        );
      const result = sut.authenticate(makeAuthenticationData());
      await expect(result).rejects.toThrow();
    });
  });

  describe('TokenGeneratorService', () => {
    it('must call generate with correct values', async () => {
      const { sut, tokenGeneratorServiceStub } = makeSut();
      const generateSpy = jest.spyOn(tokenGeneratorServiceStub, 'generate');
      await sut.authenticate(makeAuthenticationData());
      expect(generateSpy).toHaveBeenCalledWith('an_id');
    });

    it('must throw if generate throws', async () => {
      const { sut, tokenGeneratorServiceStub } = makeSut();
      jest
        .spyOn(tokenGeneratorServiceStub, 'generate')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        );
      const result = sut.authenticate(makeAuthenticationData());
      await expect(result).rejects.toThrow();
    });
  });

  describe('update Repository', () => {
    it('must call updateAcessToken with correct data', async () => {
      const { sut, repositoryStub } = makeSut();
      const updateAcessTokenSpy = jest.spyOn(
        repositoryStub,
        'updateAccessToken'
      );
      await sut.authenticate(makeAuthenticationData());
      expect(updateAcessTokenSpy).toHaveBeenCalledWith('an_id', 'any_token');
    });

    it('must throw if updateAcessToken throws', async () => {
        const { sut, repositoryStub } = makeSut()
        jest
          .spyOn(repositoryStub, 'updateAccessToken')
          .mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
          )
        const result = sut.authenticate(makeAuthenticationData())
        await expect(result).rejects.toThrow()
      })
  });

  it('must return the access token given correct values', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.authenticate(makeAuthenticationData());
    expect(accessToken).toBe('any_token');
  });
});
