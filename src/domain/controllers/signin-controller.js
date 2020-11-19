import {
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
  HTTP_UNAUTHORIZED_401,
  HTTP_BAD_REQUEST_400,
} from '../helpers/http-helper';

export class SignInController {
  constructor(validation, authentication) {
    this._validator = validation;
    this._authenticator = authentication;
  }
  async execute(httpRequest) {
    try {
      const error = this._validator.validate(httpRequest.body);
      if (error) return HTTP_BAD_REQUEST_400(error);
      const { email, password } = httpRequest.body;
      const accessToken = await this._authenticator.authenticate({
        email,
        password,
      });
      if (!accessToken) return HTTP_UNAUTHORIZED_401();
      return HTTP_OK_200({ accessToken });
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
