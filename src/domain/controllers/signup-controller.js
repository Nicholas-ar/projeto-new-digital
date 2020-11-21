import { UsersRepository } from '../../application/database/protocols';
import {
  AuthenticationService,
  HasherService,
  ValidationService,
} from '../../application/services/protocols';
import { HttpRequest, HttpResponse } from './protocols/http.d';
import { EmailInUseError } from '../errors';
import {
  HTTP_BAD_REQUEST_400,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class SignUpController {
  /**
   * SignUp controller object
   * @param {UsersRepository} repository
   * @param {AuthenticationService} authentication
   * @param {ValidationService} validator
   * @param {HasherService} hasherService
   */
  constructor(repository, authentication, validator, hasherService) {
    this._repository = repository;
    this._authentication = authentication;
    this._validator = validator;
    this._hasherService = hasherService;
  }

  /**
   * Register the user into the database, given correct data in the HTTP request.
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>} - If the data is invalid or the email is already registered into the database.
   *                            - If an error is thrown during the process.
   *                            - If the user is registered into the database, returning the accessToken into he request body.
   */
  async execute(httpRequest) {
    try {
      const error = this._validator.validate(httpRequest.body);
      if (error) return HTTP_BAD_REQUEST_400(error);

      const { email, password } = httpRequest.body;

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
