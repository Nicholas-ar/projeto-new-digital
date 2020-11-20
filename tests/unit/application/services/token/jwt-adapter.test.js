import jwt from 'jsonwebtoken';
import { JwtAdapter } from '../../../../../src/application/services/adapters/jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token';
  },
}));

const makeSut = () => new JwtAdapter('secret');

describe('JwtAdapter', () => {
  it('must call jwt with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.generate('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
  it('must return a token given correct values', () => {
    const sut = makeSut();
    const accessToken = sut.generate('any_id');
    expect(accessToken).toBe('any_token');
  });
  it('must throw if jwt throws', () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => sut.generate('any_id')).toThrow();
  });
});
