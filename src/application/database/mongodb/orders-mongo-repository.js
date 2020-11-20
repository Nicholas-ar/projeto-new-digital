import { MongoHelper } from '../../helpers/mongoHelper';
/**
 * @interface Repository
 * @method list
 * @method retrieve
 * @method create
 * @method update
 * @method delete
 */

/**
 * @typedef OrderData
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {String} delivered
 */

/**
 * @typedef Order
 * @property {String} _id
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {String} delivered
 */

/**
 * Orders repository for the Mongo database
 * @implements {Repository}
 */
export class OrdersMongoRepository {
  /**
   * Lists all Orders in the database
   * @returns {Array<Order>}
   */
  async list() {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.find({}).toArray();
  }

  /**
   * Retrieves the first user that matches given CPF from the database
   * @param {String} cpf
   * @returns {Promise<import('../../services/authentication/database-user-authentication').User> | Null}
   */
  async retrieveByCpf(cpf) {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.findOne({ cpf });
  }

  /**
   * Creates an User into the database
   * @param {OrderData} orderData
   * @returns {Promise<Order>}
   */
  async create(orderData) {
    const orderCollection = await MongoHelper.getCollection('orders');
    const result = await orderCollection.insertOne(orderData);
    return result.ops[0];
  }

  /**
   * Updates the first match of a given query with the newData 
   * property and value from the database
   * @param {Object} query
   * @param {Object} newData
   */
  async update(query, newData) {
    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.updateOne(query, { $set: newData });
  }

  /**
   * Deletes the first match of a given query from the database
   * @param {Object} query
   */
  async delete(query) {
    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.deleteOne(query);
  }
}
