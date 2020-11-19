import { EmailInUseError } from '../errors/email-in-use-error';
import {
  HTTP_BAD_REQUEST_400,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class SignUpController {
  constructor(repository, authentication, validator, hasherService) {
    this._repository = repository;
    this._authentication = authentication;
    this._validator = validator;
    this._hasherService = hasherService;
  }
  async execute(httpRequest) {
    try {
      const error = this._validator.validate(httpRequest);
      if (error) return HTTP_BAD_REQUEST_400(error);

      const { email, password } = httpRequest;

      const user = await this._repository.create({
        email,
        password: await this._hasherService.hash(password),
      });
      
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
