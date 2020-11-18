import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../../helpers/http-helper';

class OrderController {
  constructor(repository) {
    this.repository = repository;
  }

  async retrieveOrder(httpRequest) {
    try {
      const orders = await this.repository.retriveByCpf(httpRequest.cpf);
      if (!orders)
        return HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' });
      return HTTP_OK_200(orders);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  async createOrder(httpRequest) {
    try {
      const order = await this.repository.create(httpRequest);
      if (!order) return HTTP_BAD_REQUEST_400({ message: 'Invalid param' });
      return HTTP_CREATED_201(order);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  async updateOrder(httpRequest) {
    try {
      const order = await this.repository.update(httpRequest);
      if (!order) return HTTP_BAD_REQUEST_400({ message: 'Invalid param' });
      return HTTP_OK_200(order);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}

export default OrderController;
