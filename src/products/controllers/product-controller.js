import { MongoHelper } from '../../helpers/mongoHelper';

export class ProductController {
  createProduct = async (productData) => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  };

  getProduct = (id) => null;
}
