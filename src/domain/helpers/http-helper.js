import { HttpResponse } from '../controllers/protocols/http.definition';
import { ServerError, UnauthorizedError } from '../errors';

/**
 * That returns a Bad Request response, with a 400 statusCode and an error body.
 * @param {Error} error
 * @returns {HttpResponse}
 */
export const HTTP_BAD_REQUEST_400 = (error) => ({
  statusCode: 400,
  body: error,
});

/**
 * That returns an OK response, with a 200 statusCode and a data object, message inside the body.
 * @param {any} data
 * @returns {HttpResponse} -
 */
export const HTTP_OK_200 = (data) => ({
  statusCode: 200,
  body: data,
});

/**
 * That returns an OK response, with a 201 statusCode and a data object, message inside the body.
 * @param {any} data
 * @returns {HttpResponse} -
 */
export const HTTP_CREATED_201 = (data) => ({
  statusCode: 201,
  body: data,
});

/**
 * That returns an OK response, with a 204 statusCode and an empty body.
 * @param {any} data
 * @returns {HttpResponse} -
 */
export const HTTP_NO_CONTENT_204 = () => ({
  statusCode: 204,
  body: {},
});

/**
 * That returns an UNAUTHORIZED response, with a 401 statusCode and a data object, message inside the message.
 * @returns {HttpResponse} -
 */
export const HTTP_UNAUTHORIZED_401 = () => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

/**
 * That returns an SERVER ERROR response, with a 500 statusCode and a data object, message inside the message.
 * @param {Error} error
 * @returns {HttpResponse} -
 */
export const HTTP_SERVER_ERROR_500 = (error) => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
