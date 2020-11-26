import {
  HTTP_FORBIDDEN_403,
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class AuthenticationMiddleware {
  constructor(loadAccountByToken, role) {
    this._loadAccountByToken = loadAccountByToken;
    this._role = role;
  }
  async execute(httpRequest) {
    try {
      if (httpRequest.headers) {
        const accessToken = httpRequest.headers['x-access-token'];
        if (accessToken) {
          const user = await this._loadAccountByToken.load(
            accessToken,
            this._role
          );
          if (user) return HTTP_OK_200({ _id: user._id });
        }
      }
      return HTTP_FORBIDDEN_403();
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
