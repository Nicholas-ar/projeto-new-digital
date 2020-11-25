import { User, UserData } from '../../../domain/entities/user';

/**
 * @abstract
 * @name UsersRepository
 * @method create
 * @method retrieveByEmail
 * @method updateAccessToken
 */
export class UsersRepository {
  constructor() {
    throw Error('Not implemented');
  }

  /**
   * Creates a user document into Mongo database.
   * @param {UserData} userData
   * @returns {Promise<User>}
   */
  async create(userData) {
    throw Error('Not implemented');
  }

  /**
   * Retrieves the first user from the database that matches the given email
   * @param {String} email
   * @returns {Promise<User>}
   */
  async retrieveByEmail(email) {
    throw Error('Not implemented');
  }

  /**
   * Updates the User that matches the id in the database
   * adding the accessToken property
   * @param {String} id
   * @param {String} token
   */
  async updateAccessToken(id, token) {
    throw Error('Not implemented');
  }
}
