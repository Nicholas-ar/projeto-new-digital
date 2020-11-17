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

  getProduct = (id) => null;
}
