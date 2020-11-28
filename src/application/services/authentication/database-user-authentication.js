import { User } from '../../../domain/entities/user';
import { HasherService, TokenService } from '../../../domain/services/protocols';
import { UsersRepository } from '../../database/protocols/users-repository.definition';

/**
 * Autheticator object that retrieves an user by it's email, validates the
 * given password with the hash found in the database and returns an access token
 * @method authenticate
 */
export class DatabaseUserAuthentication {
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
    const user = await this._repository.retrieveByEmail(data.email);
    if (user) {
      const isValid = await this._hashComparerService.compare(
        user.password,
        data.password
      );
      if (isValid) {
        const accessToken = this._tokenGeneratorService.generate(user._id);
        await this._repository.updateAccessToken(user._id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
