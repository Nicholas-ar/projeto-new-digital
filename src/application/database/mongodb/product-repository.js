import { MongoHelper } from '../../helpers/mongoHelper';

/**
 * @typedef ProductData
 * @property {String} name
 * @property {String} description
 * @property {Number} price
 * @property {String} brand
 * @property {String} weight
 * @property {String} dimensions
 * @property {Number} releaseDate
 * @property {Number} stock
 */

/**
 * Products repository for the Mongo database
 * @method create
 * @method getByName
 * @method getAll
 * @method update
 * @method delete
 */

export class ProductRepository {
  async create(productData) {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  }

  async getByName(productName) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.findOne(productName);
  }

  /**
   * Gets all Products in the database
   * @returns {Promise<Array<Product>>}
   */
  async getAll() {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.find({}).toArray();
  }

  async update(productQuery, valuesToChange) {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.updateOne(productQuery, valuesToChange);
  }

  async delete(productQuery) {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteOne(productQuery);
  }
}
