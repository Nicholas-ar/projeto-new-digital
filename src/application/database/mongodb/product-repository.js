import { ObjectID } from 'mongodb';
import { Product, ProductData } from '../../../domain/entities';
import { MongoHelper } from '../../helpers/mongo-helper';
import { ObjectID } from 'mongodb';

/**
 * Products repository for the Mongo database
 * @method create
 * @method getByQuery
 * @method getAll
 * @method update
 * @method delete
 */

export class ProductRepository {
  /**
   * Inserts a product in the database
   * @param {ProductData} productData
   * @returns {Promise<Product>}
   */
  async create(productData) {
    const productCollection = await MongoHelper.getCollection('products');
    const createdproduct = await productCollection.insertOne(productData);
    return createdproduct.ops[0];
  }

  /**
   * Gets a product in the database specified by a query
   * @param {Object} productQuery
   * @returns {Promise<Product>}
   */
  async getByQuery(productQuery) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.findOne(productQuery);
  }

  /**
   * Retrieves the first product that matches given id from the database
   * @param {String} id 
   * @returns {Promise<Product> }
   */
  async getById(id) {
    const productCollection = await MongoHelper.getCollection('products');
<<<<<<< HEAD
=======
    const products = await productCollection.find({}).toArray();
    if (typeof products[0]._id === typeof 'teste') {
      return await productCollection.findOne({ _id: id });
    }
>>>>>>> main
    return await productCollection.findOne(new ObjectID(id));
  }

  /**

   * Gets all Products in the database
   * @returns {Promise<Array<Product>>}
   */
  async getAll() {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.find({}).toArray();
  }

  /**
   * Updates a product in the database specified by a query
   * @param {Object} productQuery - Query to find the product in the database
   * @param {Object} valuesToChange - Must have a $set property, with another object as its key,
   * this object must have properties and keys that will update the ones currently in the product.
   * @returns {Promise<Array<Object>>}
   */
  async update(productQuery, valuesToChange) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.updateOne(productQuery, valuesToChange);
  }

  /**
   * Deletes a product in the database
   * @param {Object} productQuery - Query to find the product in the database
   */
  async delete(productQuery) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.deleteOne(productQuery);
  }
}
