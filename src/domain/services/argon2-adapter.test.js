import argon2 from 'argon2';
import { Argon2Adapter } from './argon2-adapter';

jest.mock('argon2', () => ({
  async hash(value) {
    return new Promise((resolve) => resolve('hashed_password'));
  },
  async verify(hash, value) {
    return new Promise((resolve) => resolve(true));
  },
}));

const makeSut = () => {
  return new Argon2Adapter();
};

describe('Argon2Adapter', () => {
  describe('hash method', () => {
    it('must be called with correct value', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(argon2, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value');
    });
    it('must return a hash given a plain text password', async () => {
      const sut = makeSut();
      const hashedPassword = await sut.hash('any_value');
      expect(hashedPassword).toBe('hashed_password');
    });
  });

  describe('compare method', () => {
    it('must be called with correct values', async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(argon2, 'verify');
      await sut.compare('any_hash', 'any_value');
      expect(verifySpy).toHaveBeenCalledWith('any_hash', 'any_value');
    });
    it('must return true if it succeds', async () => {
      const sut = makeSut();
      const isValid = await sut.compare('any_hash', 'any_value');
      expect(isValid).toBeTruthy();
    });
    it('must return false if it fails', async () => {
      const sut = makeSut();
      jest
        .spyOn(argon2, 'verify')
        .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
      const isValid = await sut.compare('any_hash', 'any_value');
      expect(isValid).toBeFalsy();
    });
  });

  it('must throw if hash throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(argon2, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    await expect(sut.hash('any_value')).rejects.toThrow();
  });

  it('must throw if compare throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(argon2, 'verify')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    await expect(sut.compare('any_hash', 'any_value')).rejects.toThrow();
  });
});
