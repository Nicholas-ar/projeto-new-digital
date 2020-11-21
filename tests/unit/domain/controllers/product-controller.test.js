import { ProductController } from '../../../../src/domain/controllers/product-controller';
import { MongoHelper } from '../../../../src/application/helpers/mongoHelper';
import { ProductRepository } from '../../../../src/application/database/mongodb/product-repository';

let productCollection;

const mockProduct = {
  name: 'abc',
  description: 'something',
  price: 10000,
  brand: 'generic',
  weight: '10 kg',
  dimensions: '50 x 50 x 50',
  releaseDate: 2010,
  stock: 10,
};

describe('Product Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());
  it('it must return a product with 200 status code given valid a product name', async () => {
    const httpRequest = {
      query: {
        name: 'abc',
      },
    };
    const productRepository = new ProductRepository();
    const productController = new ProductController(productRepository);
    await productCollection.insertOne(mockProduct);
    const res = await productController.retrieveProduct(httpRequest);
    const product = res.body;
    expect(res.statusCode).toBe(200);
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(10000);
    expect(product.brand).toBe('generic');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2010);
    expect(product.stock).toBe(10);
  });
});
