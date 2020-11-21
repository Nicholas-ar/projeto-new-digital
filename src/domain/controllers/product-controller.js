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
  async retrieveProduct(httpRequest) {
    try {
      const product = await this.repository.getByName(httpRequest.body);
      const all = await this.repository.getAll();
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
