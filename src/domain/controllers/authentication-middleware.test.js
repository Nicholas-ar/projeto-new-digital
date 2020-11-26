import { HTTP_FORBIDDEN_403 } from '../helpers/http-helper';
import { AuthenticationMiddleware } from './authentication-middleware';

const makeFakeAccount = () => ({
  _id: 'valid_id',
  email: 'valid_email',
  password: 'hashed_password',
});

const makeLoadAccountByToken = () => {
  class LoadAccountbyTokenStub {
    async load(accessToken, role) {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountbyTokenStub();
};

const makeSut = () => {
  const loadAccountbyTokenStub = makeLoadAccountByToken();
  const sut = new AuthenticationMiddleware(loadAccountbyTokenStub);
  return { sut, loadAccountbyTokenStub };
};

describe('AuthenticationMiddleware', () => {
  it('must return a 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.execute({});
    expect(httpResponse).toEqual(HTTP_FORBIDDEN_403());
  });

  it('must call loadAccountbytoken with correct accessToken', async () => {
    const { sut, loadAccountbyTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountbyTokenStub, 'load');
    await sut.execute({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });

  it('must return a 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountbyTokenStub } = makeSut();
    jest
      .spyOn(loadAccountbyTokenStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const httpResponse = await sut.execute({
      headers: {
        'x-access-token': 'invalid_token',
      },
    });
    expect(httpResponse).toEqual(HTTP_FORBIDDEN_403());
  });
});
