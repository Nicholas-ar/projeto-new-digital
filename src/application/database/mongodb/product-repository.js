import { MongoHelper } from '../../helpers/mongoHelper';

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
   */
  async create(productData) {
    const productCollection = await MongoHelper.getCollection('products');
    const createdproduct = await productCollection.insertOne(productData);
    return createdproduct.ops[0];
  }

  /**
   * Gets a product in the database specified by a query
   * @returns {Promise<Object>}
   */
  async getByQuery(productQuery) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.findOne(productQuery);
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
