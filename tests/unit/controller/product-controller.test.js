import { ProductController } from '../../../src/domain/controllers/product-controller';
import { MongoHelper } from '../../../src/application/helpers/mongoHelper';

let productCollection;

const mockProduct = {
  name: 'abc',
  description: 'something',
  price: 10000,
  brand: 'generic',
  weight: '10 kg',
  dimensions: '50 x 50 x 50',
  releaseDate: 2010,
  quantity: 20,
};

describe('Product Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());
  it("should pass because it's a placeholder test", async () => {});
});
