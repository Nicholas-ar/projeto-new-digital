import { Product } from '../../../domain/entities';

/**
 * @abstract
 * @name ProductRepository
 * @method create
 * @method getByQuery
 * @method getAll
 * @method update
 * @method delete
 */
export class ProductRepository {
  constructor() {
    throw Error('Not implemmented');
  }

  /**
   * Create a  in the database
   * @param {String} productData
   * @returns {Promise<Array<Product>>}
   */
  async create(productData) {
    throw Error('Not implemmented');
  }

  /**
   * Lists all Orders in the database
   * @returns {Promise<Array<Product>>}
   */
  async getByQuery(productQuery) {
    throw Error('Not implemmented');
  }

  /**
   * Creates an User into the database
   * @returns {Promise<String>}
   */
  async retrieveById(id) {
    throw Error('Not implemmented');
  }

  /**
   * Creates an User into the database
   * @returns {Promise<Array<Product>>}
   */
  async getAll() {
    throw Error('Not implemmented');
  }

  /**
   * Retrieves the first order that matches given CPF from the database
   * @param {Object} productQuery
   * @param {Object} valuesToChange
   * @returns {Promise<Array<Product>>}
   */
  async update(productQuery, valuesToChange) {
    throw Error('Not implemmented');
  }

  /**
   * Retrieves the first order that matches given ID from the database
   * @param {Object} productQuery
   */
  async delete(productQuery) {
    throw Error('Not implemmented');
  }
}
