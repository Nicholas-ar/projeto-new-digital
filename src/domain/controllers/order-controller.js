import { OrdersRepository } from '../../application/database/protocols/orders-repository.definition';

import {
  PaymentService,
  ValidationService,
} from '../../application/services/protocols';

import {
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
import { HttpRequest, HttpResponse } from './protocols/http.d';

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
   * @param {OrdersRepository} repository - Database repository.
   * @param {ValidationService} cpfValidator - Validator object for validating the CPF.
   * @param {PaymentService} paymentAdapter - Payment service that allows credit card transactions.
   */
  constructor(repository, cpfValidator, paymentAdapter) {
    this.repository = repository;
    this.cpfValidator = cpfValidator;
    this.paymentAdapter = paymentAdapter;
  }

  /**
   * Receives a HttpRequest containing a valid cpf field in the body
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>} - A 400 http response will be returned if the CPF is invalid or no matches are found in the database.
   *                                  - A 500 http response will be returned if an error is thrown during the process.
   *                                  - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async list(httpRequest) {
    try {
      const orders = await this.repository.list();
      return HTTP_OK_200(orders);
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives a HttpRequest containing a valid cpf field in the body
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>} - A 400 http response will be returned if the CPF is invalid or no matches are found in the database.
   *                                  - A 500 http response will be returned if an error is thrown during the process.
   *                                  - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async retrieveOrder(httpRequest) {
    try {
      const error = this.cpfValidator.validate(httpRequest.body.cpf);
      if (error) return HTTP_BAD_REQUEST_400(error);
      const order = await this.repository.retrieveByCpf(httpRequest.body.cpf);
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
   * @param {HttpRequest} httpRequest - Request containing  the OrderData and PaymentData.
   * @returns {Promise<HttpResponse>} - A 400 http response will be returned if the CPF or the Payment credentials are invalid.
   *                                  - A 500 http response will be returned if an error is thrown during the process.
   *                                  - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async createOrder(httpRequest) {
    try {
      const { orderData, paymentData } = httpRequest.body;
      const error = this.cpfValidator.validate(httpRequest.body.orderData.cpf);
      if (error) return HTTP_BAD_REQUEST_400(error);
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
   * @param {HttpRequest} httpRequest
   * @returns {Promise<HttpResponse>} - It will be returned if no matches are found in the database.
   *                                  - A 500 http response will be returned if an error is thrown during the process.
   *                                  - A 200 http response will be returned otherwise, containing the Order entity in the body.
   */
  async updateOrder(httpRequest) {
    try {
      const { query, newValue } = httpRequest.body;
      const order = await this.repository.update(query, newValue);
      if (order) return HTTP_OK_200(order);
      return HTTP_BAD_REQUEST_400(new InvalidQueryError());
    } catch (error) {
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
