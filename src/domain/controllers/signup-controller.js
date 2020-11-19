import { EmailInUseError } from '../errors/email-in-use-error';
import {
  HTTP_BAD_REQUEST_400,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class SignUpController {
  constructor(repository, authentication) {
    this._repository = repository;
    this._authentication = authentication;
  }
  async createUser(httpRequest) {
    try {
      const { name, email, password } = httpRequest;
      const user = await this._repository.create({ name, email, password });
      if (!user) return HTTP_BAD_REQUEST_400(new EmailInUseError());
      const accessToken = await this._authentication.authenticate({
        email,
        password,
      });
      return HTTP_CREATED_201({ accessToken });
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
