/**
 * @typedef HttpResponse
 * @property {Number} statusCode
 * @property {any} body
 */
export const HttpResponse = {
  statusCode: Number,
  body: Object,
};

/**
 * @typedef HttpRequest
 * @property {any} body
 * @property {any} [params]
 */
export const HttpRequest = {
  statusCode: Number,
  body: Object,
};
