import jwt from 'jsonwebtoken';
import { JwtAdapter } from '../../../../../src/application/services/adapters/token/jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token';
  },

  verify() {
    return 'any_token';
  },
}));

const makeSut = () => new JwtAdapter();

describe('JwtAdapter', () => {
  describe('sign', () => {
    it('must call jwt with correct values', async () => {
      const sut = makeSut();
      sut.secret = 'secret';
      const signSpy = jest.spyOn(jwt, 'sign');
      sut.generate('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });
    it('must return a token given correct values', () => {
      const sut = makeSut();
      const accessToken = sut.generate('any_id');
      expect(accessToken).toBe('any_token');
    });
    it('must throw if sign throws', () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(() => sut.generate('any_id')).toThrow();
    });
  });

  describe('verify', () => {
    it('must call verify with correct values', async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      sut.decipher('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'dij98c453347923j3');
    });
  });

  it('must return a value if verify succeds', async () => {
    const sut = makeSut();
    const result = sut.decipher('any_token');
    expect(result).toBe('any_token');
  });

  it('must throw if verify throws', () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => sut.decipher('any_id')).toThrow();
  });
});
