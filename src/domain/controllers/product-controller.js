import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Receives an HttpRequest containing a valid product field in the body
   * @param httpRequest
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 201 http response will be returned otherwise, with the product on the body.
   *
   */
  async createProduct(httpRequest) {
    try {
      const product = await this.repository.create(
        httpRequest.body.mockProduct
      );
      return { statusCode: 201, body: product };
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest containing a valid product query field in the body
   * @param httpRequest
   * - A 400 http response will be returned if no matches are found in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing the product info in the body.
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

  /**
   * Receives an empty HttpRequest containing a valid product query field in the body
   * @param httpRequest
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an array with the products info in the body.
   */
  async retrieveAll() {
    try {
      const allProducts = await this.repository.getAll();
      return HTTP_OK_200(allProducts);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /*
  async update(httpRequest) {
    try {
      const allProducts = await this.repository.getAll();
      if (!allProducts) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_OK_200(allProducts);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  async deleteProduct(httpRequest) {
    try {
      const allProducts = await this.repository.getAll();
      if (!allProducts) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_OK_200(allProducts);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
  */
}
