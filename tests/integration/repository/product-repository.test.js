import { ProductRepository } from '../../../src/application/database/mongodb';
import { MongoHelper } from '../../../src/application/helpers/mongo-helper';

let productCollection;

const mockProduct = {
  name: 'abc',
  description: 'something',
  price: 10000,
  brand: 'generic',
  category: 'generic',
  weight: '10 kg',
  dimensions: '50 x 50 x 50',
  releaseDate: 2010,
  stock: 10,
};

const ps5 = {
  name: 'PS5',
  description: 'Expensive gaming console',
  price: 5000,
  brand: 'Sony',
  category: 'Console',
  weight: '50 kg',
  dimensions: '50 x 50 x 50',
  releaseDate: 2020,
  stock: 1,
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
    expect(product.stock).toBe(10);
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
    expect(product.stock).toBe(10);
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
    const query = { name: 'abc' };
    const product = await productRepository.getByQuery(query);
    expect(product._id).toBeTruthy();
    expect(product.description).toBe('something');
    expect(product.price).toBe(10000);
    expect(product.brand).toBe('generic');
    expect(product.weight).toBe('10 kg');
    expect(product.dimensions).toBe('50 x 50 x 50');
    expect(product.releaseDate).toBe(2010);
    expect(product.stock).toBe(10);
  });

  it('must return all products in products collection', async () => {
    const productRepository = new ProductRepository();
    await productCollection.insertOne(mockProduct);
    await productCollection.insertOne(ps5);

    const product = await productRepository.getAll();
    expect(product[0].name).toBe('abc');
    expect(product[1].name).toBe('PS5');
  });
});
