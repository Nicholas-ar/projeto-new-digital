import {
  InvalidParameterError,
  InvalidTransactionCredentialsError,
  InvalidQueryError,
  OrderNotFoundError,
} from '../errors';

import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../helpers/http-helper';

export default class OrderController {
  /**
   * @example
   * ```js
   * const validator = new Validator();
   * const payment = new PaymentService();
   * const cpfValidador = new CpfValidator();
   *
   * const orderController = new OrderController(validator, payment, cpfValidador);
   * ```
   *
   * @param {Repository} repository - Database repository.
   * @param {Validator} cpfValidator - Validator object for validating the CPF.
   * @param {PaymentService} paymentAdapter - Payment service that allows credit card transactions.
   */
  constructor(repository, cpfValidator, paymentAdapter) {
    this.repository = repository;
    this.cpfValidator = cpfValidator;
    this.paymentAdapter = paymentAdapter;
  }

  /**
   * Receives a HttpRequest containing a valid cpf field in the body
   * @param {import('../helpers/http-helper').HttpRequest} httpRequest
   * @returns {Promise<Object>} - A 400 http response will be returned if the CPF is invalid or no matches are found in the database.
   *                            - A 500 http response will be returned if an error is thrown during the process.
   *                            - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async retrieveOrder(httpRequest) {
    try {
      if (!this.cpfValidator.validate(httpRequest.body.cpf)) {
        return HTTP_BAD_REQUEST_400(new InvalidParameterError('cpf'));
      }
      const order = await this.repository.retriveByCpf(httpRequest.body.cpf);
      if (!order) return HTTP_BAD_REQUEST_400(new OrderNotFoundError());
      return HTTP_OK_200(order);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives a HttpRequest containing the order and payment information.
   * It will make a transaction if the given values are valid, and insert
   * an Order entity into the Database.
   * @param {import('../helpers/http-helper').HttpRequest} httpRequest - Request containing  the OrderData and PaymentData.
   * @returns {Promise<Object>} - A 400 http response will be returned if the CPF or the Payment credentials are invalid.
   *                            - A 500 http response will be returned if an error is thrown during the process.
   *                            - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async createOrder(httpRequest) {
    try {
      const { orderData, paymentData } = httpRequest.body;
      if (!this.cpfValidator.validate(orderData.cpf)) {
        return HTTP_BAD_REQUEST_400(new InvalidParameterError('cpf'));
      }
      const transactionId = this.paymentAdapter.pay(paymentData);
      if (transactionId) {
        orderData.transactionId = transactionId;
        const order = await this.repository.create(httpRequest.body);
        if (order) return HTTP_CREATED_201(order);
      }
      return HTTP_BAD_REQUEST_400(new InvalidTransactionCredentialsError());
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives a HttpRequest containing the query and value to update.
   * It will update an Order entity into the Database.
   * @param {import('../helpers/http-helper').HttpRequest} httpRequest
   * @returns {Promise<Object>} - It will be returned if no matches are found in the database.
   *                            - A 500 http response will be returned if an error is thrown during the process.
   *                            - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async updateOrder(httpRequest) {
    try {
      const order = await this.repository.update(httpRequest);
      if (!order) return HTTP_BAD_REQUEST_400(new InvalidQueryError());
      return HTTP_OK_200(order);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
