import { InvalidQueryError } from '../errors';
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

  /**
   * Receives an HttpRequest containing a valid product field in the body
   * @param httpRequest
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 201 http response will be returned otherwise, with the product on the body.
   *
   */
  async createProduct(httpRequest) {
    try {
      // presigned url that needs to be sent to the client for a PUT request containing the image file
      // https://qrobuy.s3-sa-east-1.amazonaws.com/${imageName}.jpg => URL that needs to be saved into product document
      // httpRequest.body.product.URLimage = `https://qrobuy.s3-sa-east-1.amazonaws.com/${imageName}.jpg`
      const product = await this.repository.create(httpRequest.body.product);
      return HTTP_CREATED_201(product);
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
      const resProduct = await this.repository.getByQuery(httpRequest.body);
      if (!resProduct)
        return HTTP_BAD_REQUEST_400({
          message: 'No products with this query found',
        });
      return HTTP_OK_200(resProduct);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an empty HttpRequest
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

  /**
   * Receives an HttpRequest with an update query and the values to be updated in the format $set: {...}
   * @param httpRequest
   * - A 400 http response will be returned if no matches are found to be updated in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an binary value in the body, indicating if the update has been successful.
   */
  async updateProduct(httpRequest) {
    try {
      const response = await this.repository.update(
        httpRequest.body.updateQuery,
        httpRequest.body.updatedValues
      );
      const updated = response.modifiedCount;

      if (updated === 0) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_OK_200(updated);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest with an delete query
   * @param httpRequest
   * - A 400 http response will be returned if no matches are found to be deleted in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an binary value in the body, indicating if the deletion has been successful.
   */
  async deleteProduct(httpRequest) {
    try {
      const response = await this.repository.delete(
        httpRequest.body.deleteQuery
      );
      const found = response.deletedCount;
      if (found === 0) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_OK_200(found);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
