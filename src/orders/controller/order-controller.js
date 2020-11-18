import { HTTP_BAD_REQUEST_400, HTTP_OK_200 } from '../../helpers/http-helper';

class OrderController {
  constructor(repository) {
    this.repository = repository;
  }

  async handleRetrival(httpRequest) {
    const orders = await this.repository.retriveByCpf(httpRequest.cpf);
    if (!orders) return HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' });
    return HTTP_OK_200(orders);
  }
}

export default OrderController;
