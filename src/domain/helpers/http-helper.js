import { ServerError, UnauthorizedError } from '../errors';

export const HTTP_BAD_REQUEST_400 = (error) => ({
  statusCode: 400,
  body: error,
});

export const HTTP_OK_200 = (data) => ({
  statusCode: 200,
  body: data,
});

export const HTTP_CREATED_201 = (data) => ({
  statusCode: 201,
  body: data,
});

export const HTTP_UNAUTHORIZED_401 = () => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const HTTP_SERVER_ERROR_500 = (error) => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
