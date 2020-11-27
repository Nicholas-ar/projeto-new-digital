import request from 'supertest';
import app from '../../../../src/application/rest-api/app';
import { MongoHelper } from '../../../../src/application/helpers/mongo-helper';
import { sign } from 'jsonwebtoken';
import env from '../../../../src/application/config/environment';

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

const makeAdminUser = async () => {
  const user = await usersCollection.insertOne({
    email: 'valid_email@gmail.com',
    password: 'valid_password',
    isAdmin: true,
  });
  const _id = user.ops[0]._id;
  const accessToken = sign({ id: _id }, env.JWT_SECRET);
  await usersCollection.updateOne(
    {
      _id,
    },
    {
      $set: {
        accessToken,
      },
    }
  );
  return accessToken;
};

let usersCollection;
let productsCollection;
describe('Products routes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productsCollection = await MongoHelper.getCollection('products');
    usersCollection = await MongoHelper.getCollection('users');
    await productsCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  describe('create product', () => {
    it('must return a 403 if user is not admin', async () => {
      await productsCollection.insertMany(makeFakeProducts());
      await request(app)
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
        .expect(403);
    });

    it('must create a product returning a 201', async () => {
      const accessToken = await makeAdminUser();
      const response = await request(app)
        .post('/api/v1/product')
        .set('x-access-token', accessToken)
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

  describe('list products', () => {
    it('must list registered products a 200', async () => {
      await productsCollection.insertMany(makeFakeProducts());
      const response = await request(app).get('/api/v1/products').expect(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('retrieve products', () => {
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
  });

  describe('update products', () => {
    it('must return a 403 if user is not admin', async () => {
      await productsCollection.insertMany(makeFakeProducts());
      await request(app)
        .patch('/api/v1/product/2')
        .send({
          price: 6000,
        })
        .expect(403);
    });

    it('must update a registered product returning a 200', async () => {
      const accessToken = await makeAdminUser();
      await productsCollection.insertMany(makeFakeProducts());
      const response = await request(app)
        .patch('/api/v1/product/2')
        .set('x-access-token', accessToken)
        .send({
          price: 6000,
        })
        .expect(200);

      expect(response.body).toEqual(1);
    });
  });

  describe('delete product', () => {
    it('must return a 403 if user is not admin', async () => {
      await productsCollection.insertMany(makeFakeProducts());
      await request(app)
        .delete('/api/v1/product/2')
        .expect(403);
    });

    it('must delete a registered product returning a 204', async () => {
      const accessToken = await makeAdminUser();
      await productsCollection.insertMany(makeFakeProducts());
      await request(app)
        .delete('/api/v1/product/2')
        .set('x-access-token', accessToken)
        .expect(204);
      const amount = await productsCollection.countDocuments();
      expect(amount).toEqual(1);
    });
  });
});
