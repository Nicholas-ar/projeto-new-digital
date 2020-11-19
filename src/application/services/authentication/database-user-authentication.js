export class DatabaseUserAuthentication {
  constructor(repository, hashComparerService, tokenGeneratorService) {
    this._repository = repository;
    this._hashComparerService = hashComparerService;
    this._tokenGeneratorService = tokenGeneratorService;
  }
  async authenticate(data) {
    const user = await this._repository.retrieveByEmail(data.email);
    if (user) {
      const isValid = await this._hashComparerService.compare(
        data.password,
        user.password
      );
      if (isValid) {
        const accessToken = await this._tokenGeneratorService.generate(
          user._id
        );
        await this._repository.updateAccessToken(user._id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
