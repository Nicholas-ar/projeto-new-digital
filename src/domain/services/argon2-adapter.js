import argon2 from 'argon2';

export class Argon2Adapter {
  async hash(value) {
    const hash = await argon2.hash(value);
    return hash;
  }

  async compare(hash, value) {
    const isValid = await argon2.verify(hash, value);
    return isValid;
  }
}
