import { ProductController } from './product-controller';
import { MongoHelper } from '../../helpers/mongoHelper';

let productCollection;

describe('Product Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  it('should insert a doc into collection', async () => {
    const productController = new ProductController();

    const mockProduct = {
      name: 'abc',
      description: 'something',
      price: 10000,
      brand: 'generic',
      weight: '10 kg',
      dimensions: '50 x 50 x 50',
      releaseDate: '2010',
    };
    await productController.createProduct(mockProduct);
    const product = await productCollection.findOne({ name: 'abc' });
    expect(product).toEqual(mockProduct);
  });
});
