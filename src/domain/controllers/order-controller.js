import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

class OrderController {
  constructor(repository, cpfValidator, paymentAdapter) {
    this.repository = repository;
    this.cpfValidator = cpfValidator;
    this.paymentAdapter = paymentAdapter;
  }

  async retrieveOrder(httpRequest) {
    try {
      if (!this.cpfValidator.validate(httpRequest.cpf)) {
        return HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' });
      }
      const orders = await this.repository.retriveByCpf(httpRequest.cpf);
      if (!orders)
        return HTTP_BAD_REQUEST_400({ message: 'No orders were found' });
      return HTTP_OK_200(orders);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  async createOrder(httpRequest) {
    try {
      const { orderData, paymentData } = httpRequest;
      if (!this.cpfValidator.validate(orderData.cpf)) {
        return HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' });
      }
      const transactionId = this.paymentAdapter.pay(paymentData);
      if (transactionId) {
        orderData.transactionId = transactionId;
        const order = await this.repository.create(httpRequest);
        if (order) return HTTP_CREATED_201(order);
      }
      return HTTP_BAD_REQUEST_400({ message: 'Invalid transaction credentials' })
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
