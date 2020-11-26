export class LoadAccountByToken {
  constructor(decrypter, repository) {
    this._decrypter = decrypter;
    this._repository = repository;
  }
  async load(accessToken, role) {
    const token = await this._decrypter.decrypt(accessToken);
    if (token) {
      const user = await this._repository.retrieveByToken(accessToken, role);
      if(user) return user
    }
    return null;
  }
}
