import {
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
  HTTP_UNAUTHORIZED_401,
  HTTP_BAD_REQUEST_400,
} from '../helpers/http-helper';

/**
 * Controller for the user sign in use case.
 * @class
 * @implements {Controller}
 */
export class SignInController {
  /**
   * Controller for the user sign in use case.
   * @param {Validador} validator - Validator for the request.
   * @param {Authenticator} authenticator - Authenticator for the user that is inserted in the database.
   */
  constructor(validator, authenticator) {
    this._validator = validator;
    this._authenticator = authenticator;
  }

  /**
   * Main method, 
   * @param {import('../helpers/http-helper').HttpRequest} httpRequest 
   * @returns {HTTP_BAD_REQUEST_400} - If the validation of request data returns an error, 
   * returns a Bad Request response with the error message in the body 
   * @returns {HTTP_UNAUTHORIZED_401} - Returns an UNATHORIZED response to the client.
   * @returns {HTTP_SERVER_ERROR_500} - Returns a SERVER ERROR response to the client with the error message in the body
   * @returns {HTTP_OK_200} - Returns a successful response with the accessToken property and value in the body.
   */
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
