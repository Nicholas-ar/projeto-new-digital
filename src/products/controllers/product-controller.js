import { MongoHelper } from '../../helpers/mongoHelper';

export class ProductController {
  createProduct = async (productData) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  };

  updateProduct = async (query, valuesToChange) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.updateOne(query, valuesToChange);
  };

  deleteProduct = async (query) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteOne(query);
  };

  getProduct = (id) => null;
}
