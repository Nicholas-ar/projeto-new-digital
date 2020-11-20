/**
 * @interface Authenticator
 * @method authenticate
 */

/**
 * @typedef User
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 */

/**
 * Autheticator object that retrieves an user by it's email, validates the
 * given password with the hash found in the database and returns an access token
 * @class
 * @implements {Authenticator}
 * @method authenticate
 */
export class DatabaseUserAuthentication {
  /**
   * Autheticator object that retrieves an user by it's email, validates the
   * given password with the hash found in the database and returns an access token
   * @param {Repository} repository
   * @param {HashService} hashComparerService
   * @param {TokenGeneratorService} tokenGeneratorService
   */
  constructor(repository, hashComparerService, tokenGeneratorService) {
    this._repository = repository;
    this._hashComparerService = hashComparerService;
    this._tokenGeneratorService = tokenGeneratorService;
  }

  /**
   * Authenticates the given user returning the accessToken if given data is valid.
   * @param {User} data
   * @return {String | Null} The access token
   */
  async authenticate(data) {
    const user = await this._repository.retrieveByEmail(data.email);
    if (user) {
      const isValid = await this._hashComparerService.compare(
        data.password,
        user.password
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
