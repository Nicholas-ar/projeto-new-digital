import { LoadAccountByToken } from './load-account-by-token';

const makeFakeAccount = () => ({
  _id: 'valid_id',
  email: 'valid_email',
  password: 'hashed_password',
});

const makeDecrypter = () => {
  class DecrypterStub {
    async decrypt(value) {
      return new Promise((resolve) => resolve('any_value'));
    }
  }
  return new DecrypterStub();
};

const makeUserRepository = () => {
  class UserRepositoryStub {
    async retrieveByToken(token, role) {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new UserRepositoryStub();
};

const makeSut = () => {
  const userRepositoryStub = makeUserRepository();
  const decrypterStub = makeDecrypter();
  const sut = new LoadAccountByToken(decrypterStub, userRepositoryStub);
  return { sut, decrypterStub, userRepositoryStub };
};

describe('LoadAccountByTokenMongo', () => {
  it('must call decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', true);
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('must return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const result = await sut.load('any_token', true);
    expect(result).toBeNull();
  });

  it('must throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const result = sut.load('any_token', true);
    await expect(result).rejects.toThrow();
  });

  it('must call UserRepository with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(userRepositoryStub, 'retrieveByToken');
    await sut.load('any_token', true);
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', true);
  });

  it('must return null if UserRepository returns null', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'retrieveByToken')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const result = await sut.load('any_token', true);
    expect(result).toBeNull();
  });

  it('must throw if UserRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'retrieveByToken')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const result = sut.load('any_token', true);
    await expect(result).rejects.toThrow();
  });

  it('must return an user given valid data', async () => {
    const { sut } = makeSut();
    const result = await sut.load('any_token', true);
    expect(result).toEqual(makeFakeAccount());
  });
});
