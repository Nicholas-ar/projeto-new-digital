import { Product, ProductData } from '../../../domain/entities';

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
   * Create a Product document in the database
   * @param {ProductData} productData
   * @returns {Promise<Product>}
   */
  async create(productData) {
    throw Error('Not implemmented');
  }

  /**
   * Lists all products in the database
   * @param {Object} productQuery
   * @returns {Promise<Array<Product>>}
   */
  async getByQuery(productQuery) {
    throw Error('Not implemmented');
  }

  /**
   * retrieves a product baed on id
   * @returns {Promise<Product>}
   */
  async getById(id) {
    throw Error('Not implemmented');
  }

  /**
   * List all products
   * @returns {Promise<Array<Product>>}
   */
  async getAll() {
    throw Error('Not implemmented');
  }

  /**
   * Retrieves the first product that matches given query from the database, updating it
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
