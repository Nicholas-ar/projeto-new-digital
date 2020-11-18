import { MongoHelper } from '../../helpers/mongoHelper';

export class ProductController {
  async createProduct(productData){
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(productData);
  };

}
