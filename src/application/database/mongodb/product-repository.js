import { MongoHelper } from '../../helpers/mongoHelper';

export class ProductRepository {
  async create(productData) {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  }

  async getByName(productName) {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.findOne(productName);
  }

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
