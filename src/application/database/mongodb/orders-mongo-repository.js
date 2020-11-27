import { ObjectID } from 'mongodb';
import { Order, OrderData } from '../../../domain/entities/order';
import { MongoHelper } from '../../helpers/mongo-helper';

/**
 * Orders repository for the Mongo database
 * @method list
 * @method retrieveByCpf
 * @method listByEmail
 * @method create
 * @method update
 * @method delete
 */
export class OrdersMongoRepository {
  /**
   * Lists all Orders in the database
   * @param {String} email
   * @returns {Promise<Array<Order>>}
   */
  async listByEmail(email) {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.find({ email }).toArray();
  }

  /**
   * Lists all Orders in the database
   * @returns {Promise<Array<Order>>}
   */
  async list() {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.find({}).toArray();
  }

  /**
   * Retrieves the first Order that matches given CPF from the database
   * @param {String} cpf
   * @returns {Promise<Order> | Null}
   */
  async retrieveByCpf(cpf) {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.findOne({ cpf });
  }

  /**
   * Retrieves the first Order that matches given id from the database
   * @param {String} id
   * @returns {Promise<Order> | Null}
   */
  async retrieveById(id) {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.findOne(new ObjectID(id));
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
   * @returns {Promise<boolean>}
   */
  async update(query, newData) {
    const orderCollection = await MongoHelper.getCollection('orders');
    const objectId = new ObjectID(query._id);
    const result = await orderCollection.updateOne(
      { _id: objectId },
      { $set: newData }
    );
    const order = await orderCollection.findOne(objectId);
    if (result.result.ok === 1) return order;
    return false;
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
