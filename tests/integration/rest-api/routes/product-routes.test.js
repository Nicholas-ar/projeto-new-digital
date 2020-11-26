import request from 'supertest';
import app from '../../../../src/application/rest-api/app';
import { MongoHelper } from '../../../../src/application/helpers/mongo-helper';

const makeFakeProducts = () => [
  {
    _id: '1',
    name: 'abc',
    description: 'something',
    price: 10000,
    brand: 'generic',
    category: 'generic',
    weight: '10 kg',
    dimensions: '50 x 50 x 50',
    releaseDate: 2010,
    stock: 10,
  },
  {
    _id: '2',
    name: 'PS5',
    description: 'Expensive gaming console',
    price: 5000,
    brand: 'Sony',
    category: 'Console',
    weight: '50 kg',
    dimensions: '50 x 50 x 50',
    releaseDate: 2020,
    stock: 1,
  },
];

let productsCollection;
describe('authenticationRoutes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productsCollection = await MongoHelper.getCollection('products');
    await productsCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  describe('products route', () => {
    it('must create a product returning a 201', async () => {
      const response = await request(app)
        .post('/api/v1/product')
        .send({
          product: {
            name: 'PS5',
            description: 'Expensive gaming console',
            price: 5000,
            brand: 'Sony',
            category: 'Console',
            weight: '50 kg',
            dimensions: '50 x 50 x 50',
            releaseDate: 2020,
            stock: 1,
          },
          imageName: 'my_image',
        })
        .expect(201);

      expect(response.body.product._id).toBeTruthy();
      expect(response.body.product.name).toBe('PS5');
      expect(response.body.product.description).toBe(
        'Expensive gaming console'
      );
      expect(response.body.product.price).toEqual(5000);
      expect(response.body.product.brand).toBe('Sony');
      expect(response.body.product.category).toBe('Console');
      expect(response.body.product.weight).toBe('50 kg');
      expect(response.body.product.dimensions).toBe('50 x 50 x 50');
      expect(response.body.product.releaseDate).toEqual(2020);
      expect(response.body.product.stock).toEqual(1);
      expect(response.body.pressignedUrl).toBeTruthy();
    });
  });

  it('must list registered products a 200', async () => {
    await productsCollection.insertMany(makeFakeProducts());
    const response = await request(app).get('/api/v1/products').expect(200);
    expect(response.body).toHaveLength(2);
  });

  it('must retrieve a registered product returning a 200', async () => {
    await productsCollection.insertMany(makeFakeProducts());
    const response = await request(app).get('/api/v1/product/2').expect(200);
    expect(response.body).toEqual({
      _id: '2',
      brand: 'Sony',
      category: 'Console',
      description: 'Expensive gaming console',
      dimensions: '50 x 50 x 50',
      name: 'PS5',
      price: 5000,
      releaseDate: 2020,
      stock: 1,
      weight: '50 kg',
    });
  });

  it('must update a registered product returning a 200', async () => {
    await productsCollection.insertMany(makeFakeProducts());
    const response = await request(app)
      .patch('/api/v1/product/2')
      .send({
        price: 6000,
      })
      .expect(200);

    expect(response.body).toEqual(1);
  });

  it('must delete a registered product returning a 204', async () => {
    await productsCollection.insertMany(makeFakeProducts());
    await request(app).delete('/api/v1/product/2').expect(204);
    const amount = await productsCollection.countDocuments();
    await expect(amount).toEqual(1);
  });
});
