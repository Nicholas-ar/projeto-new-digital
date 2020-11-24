import { UserData } from '../../../domain/entities/user';

/**
 * @abstract
 * @name AuthenticationService
 * @method authenticate
 */
export class AuthenticationService {
  constructor() {
    throw new Error('Not implemented');
  }

  /**
   * Authenticates the given user returning the accessToken if given data is valid.
   * @param {UserData} data
   * @return {Promise<String> | Null} - The access token if succeeds authenticating, Null otherwise.
   */
  async authenticate(data) {
    throw new Error('Not implemented');
  }
}
