import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  async createProduct(httpRequest) {
    try {
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest containing a valid cpf field in the body
   * @param httpRequest
   * @returns {Promise<Object>} - A 400 http response will be returned if no matches are found in the database.
   *                            - A 500 http response will be returned if an error is thrown during the process.
   *                            - A 200 http response will be returned otherwise, containing the product info in the body.
   */
  async retrieveProduct(httpRequest) {
    try {
      const product = await this.repository.getByName(httpRequest.body);
      if (!product)
        return HTTP_BAD_REQUEST_400({
          message: 'No products with this name found',
        });
      return HTTP_OK_200(product);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
