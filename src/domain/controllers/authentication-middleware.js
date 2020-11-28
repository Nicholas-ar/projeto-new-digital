import { LoadAccountByToken } from '../../application/database/protocols/load-account-by-token.definition';
import {
  HTTP_FORBIDDEN_403,
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from './protocols/http.definition';

export class AuthenticationMiddleware {
  /**
   *
   * @param {LoadAccountByToken} loadAccountByToken
   * @param {Boolean} role
   */
  constructor(loadAccountByToken, role) {
    this._loadAccountByToken = loadAccountByToken;
    this._role = role;
  }

  /**
   * Middleware for authenticating the admin users via accessTokens
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>}
   */
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
