import { ProductController } from './product-controller';
import { MongoHelper } from '../../helpers/mongoHelper';

let productCollection;

const mockProduct = {
  name: 'abc',
  description: 'something',
  price: 10000,
  brand: 'generic',
  weight: '10 kg',
  dimensions: '50 x 50 x 50',
  releaseDate: 2010,
};

describe('Product Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  it('should insert a product into collection', async () => {
    const productController = new ProductController();

    await productController.createProduct(mockProduct);
    const product = await productCollection.findOne({ name: 'abc' });
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(10000);
    expect(product.brand).toBe('generic');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2010);
  });

  it('must update a product in products collection', async () => {
    const productController = new ProductController();
    await productCollection.insertOne(mockProduct);
    const updateQuery = { name: 'abc' };
    const updatedValues = {
      $set: { name: 'ps5', price: 5000, brand: 'sony', releaseDate: 2020 },
    };
    await productController.updateProduct(updateQuery, updatedValues);
    const product = await productCollection.findOne({ name: 'ps5' });
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(5000);
    expect(product.brand).toBe('sony');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2020);
  });

  it('must delete a product in products collections', async () => {
    const productController = new ProductController();
    await productCollection.insertOne(mockProduct);
    const deleteQuery = { name: 'abc' };
    await productController.deleteProduct(deleteQuery);
    const product = await productCollection.findOne(deleteQuery);
    expect(product).toBe(null);
  });
});
