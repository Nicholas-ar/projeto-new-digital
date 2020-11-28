import { User } from '../../../domain/entities';
import { UsersMongoRespository } from '../../database/mongodb/users-mongo-repository';

/**
 * @abstract
 * @name LoadAccountByTokenService
 * @method load
 */
export class LoadAccountByTokenService {
  /**
   *
   * @param {*} decrypter
   * @param {UsersMongoRespository} repository
   */
  constructor(decrypter, repository) {
    this._decrypter = decrypter;
    this._repository = repository;
    throw Error('Not implemmented');
  }

  /**
   * Lists all Orders in the database
   * @param {String} accessToken
   * @param {String} role
   * @returns {Promise<User | Null>}
   */
  async load(accessToken, role) {
    throw Error('Not implemmented');
  }
}
