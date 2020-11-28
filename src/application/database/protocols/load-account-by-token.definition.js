import { Order, OrderData, User } from '../../../domain/entities';
import { UsersMongoRespository } from '../mongodb/users-mongo-repository';

/**
 * @abstract
 * @name LoadAccountByToken
 * @method load
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
