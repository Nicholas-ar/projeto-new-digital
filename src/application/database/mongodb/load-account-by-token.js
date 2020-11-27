export class LoadAccountByToken {
  constructor(decrypter, repository) {
    this._decrypter = decrypter;
    this._repository = repository;
  }
  async load(accessToken, role) {
    const token = this._decrypter.decipher(accessToken);
    if (token) {
      const user = await this._repository.retrieveByToken(accessToken, role);
      console.log(user)
      if(user && user.isAdmin) return user
    }
    return null;
  }
}
