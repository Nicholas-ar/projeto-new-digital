import { Order, OrderData } from '../../../domain/entities/order';

/**
 * @abstract
 * @name OrdersRepository
 * @method list
 * @method create
 * @method retrieveByCpf
 * @method update
 * @method delete
 */
export class OrdersRepository {
  constructor() {
    throw Error('Not implemmented');
  }

  /**
   * Lists all Orders in the database
   * @returns {Promise<Array<Order>>}
   */
  async list() {
    throw Error('Not implemmented');
  }

  /**
   * Creates an User into the database
   * @param {OrderData} orderData
   * @returns {Promise<Order>}
   */
  async create(orderData) {
    throw Error('Not implemmented');
  }

  /**
   * Retrieves the first order that matches given CPF from the database
   * @param {String} cpf
   * @returns {Promise<Order> | Null}
   */
  async retrieveByCpf(cpf) {
    throw Error('Not implemmented');
  }

  /**
   * Updates the first match of a given query with the newData
   * property and value from the database
   * @param {Object} query
   * @param {Object} newData
   * @returns {Promise<boolean>}
   */
  async update(query, newData) {
    throw Error('Not implemmented');
  }

  /**
   * Deletes the first match of a given query from the database
   * @param {Object} query
   */
  async delete(query) {
    throw Error('Not implemmented');
  }
}
