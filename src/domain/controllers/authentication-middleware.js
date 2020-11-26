import { HTTP_FORBIDDEN_403 } from '../helpers/http-helper';

export class AuthenticationMiddleware {
  constructor(loadAccountByToken) {
    this._loadAccountByToken = loadAccountByToken;
  }
  async execute(httpRequest) {
    if (httpRequest.headers) {
      const accessToken = httpRequest.headers['x-access-token'];
      if (accessToken) {
        await this._loadAccountByToken.load(accessToken);
      }
    }
    return HTTP_FORBIDDEN_403();
  }
}
