import { MongoHelper } from '../../helpers/mongoHelper';

export class ProductRepository {
  create = async (productData) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  };

  getByName = async (productName) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.findOne(name);
  };

  getAll = async () => {
    const productCollection = await MongoHelper.getCollection('products');
    return await productCollection.find({}).toArray();
  };

  update = async (productQuery, valuesToChange) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.updateOne(productQuery, valuesToChange);
  };

  delete = async (productQuery) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteOne(productQuery);
  };
}
