import { User } from '../../../domain/entities/user';
import { UsersRepository } from '../../database/protocols/users-repository.definition';
import { HasherService, TokenService } from '../protocols';

/**
 * @abstract
 * @name UserAuthenticationService
 * @method authenticate
 */
export class UserAuthenticationService {
  /**
   * @param {UsersRepository} repository
   * @param {HasherService} hashComparerService
   * @param {TokenService} tokenGeneratorService
   */
  constructor(repository, hashComparerService, tokenGeneratorService) {
    this._repository = repository;
    this._hashComparerService = hashComparerService;
    this._tokenGeneratorService = tokenGeneratorService;
  }

  /**
   * Authenticates the given user returning the accessToken if given data is valid.
   * @param {User} data
   * @return {Promise<String> | Null} - The access token if succeeds authenticating, Null otherwise.
   */
  async authenticate(data) {
    throw new Error('Not implemented');
  }
}
