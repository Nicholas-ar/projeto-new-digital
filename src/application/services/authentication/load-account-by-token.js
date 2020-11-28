import { User } from '../../../domain/entities';
import { UsersMongoRespository } from '../../database/mongodb/users-mongo-repository';

/**
 * @method load - Retrieves the user based on accessToken
 */
export class LoadAccountByToken {
  /**
   *
   * @param {*} decrypter
   * @param {UsersMongoRespository} repository
   */
  constructor(decrypter, repository) {
    this._decrypter = decrypter;
    this._repository = repository;
  }

  /**
   * Retrieves the user based on access token
   * @param {String} accessToken
   * @param {Boolean} role - True if user is Admin false otherwise
   * @returns {Promise<User | Null>}
   */
  async load(accessToken, role) {
    const token = this._decrypter.decipher(accessToken);
    if (token) {
      const user = await this._repository.retrieveByToken(accessToken, role);
      if (user && user.isAdmin) return user;
    }
    return null;
  }
}
