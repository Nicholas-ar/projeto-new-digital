import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
} from '../../helpers/http-helper';

class OrderController {
  constructor(repository) {
    this.repository = repository;
  }

  async retrieveOrder(httpRequest) {
    const orders = await this.repository.retriveByCpf(httpRequest.cpf);
    if (!orders) return HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' });
    return HTTP_OK_200(orders);
  }

  async createOrder(httpRequest) {
    const order = await this.repository.create(httpRequest);
    return HTTP_CREATED_201(order);
  }
}

export default OrderController;
