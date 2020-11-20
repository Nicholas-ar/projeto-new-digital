import { ProductRepository } from '../../../src/application/database/mongodb/product-repository';
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
  quantity: 10,
};

describe('Product Repository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  it('should insert a product into collection', async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(mockProduct);
    const product = await productCollection.findOne({ name: 'abc' });
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(10000);
    expect(product.brand).toBe('generic');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2010);
    expect(product.quantity).toBe(10);
  });

  it('must update a product in products collection', async () => {
    const productRepository = new ProductRepository();
    await productCollection.insertOne(mockProduct);
    const updateQuery = { name: 'abc' };
    const updatedValues = {
      $set: { name: 'ps5', price: 5000, brand: 'sony', releaseDate: 2020 },
    };
    await productRepository.update(updateQuery, updatedValues);
    const product = await productCollection.findOne({ name: 'ps5' });
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(5000);
    expect(product.brand).toBe('sony');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2020);
    expect(product.quantity).toBe(10);
  });

  it('must delete a product in products collection', async () => {
    const productRepository = new ProductRepository();
    await productCollection.insertOne(mockProduct);
    const deleteQuery = { name: 'abc' };
    await productRepository.delete(deleteQuery);
    const product = await productCollection.findOne(deleteQuery);
    expect(product).toBe(null);
  });
  it('must find a product in products collection', async () => {
    const productRepository = new ProductRepository();
    await productCollection.insertOne(mockProduct);
    const nameQuery = { name: 'abc' };
    const product = await productRepository.getByName(nameQuery);
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(10000);
    expect(product.brand).toBe('generic');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2010);
    expect(product.quantity).toBe(10);
  });
});
