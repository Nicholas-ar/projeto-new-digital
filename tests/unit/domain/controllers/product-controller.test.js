import { ProductController } from '../../../../src/domain/controllers/product-controller';
import { MongoHelper } from '../../../../src/application/helpers/mongoHelper';
import { ProductRepository } from '../../../../src/application/database/mongodb/product-repository';

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

describe('Product Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  describe('createProduct', () => {
    it('must create a product with 201 status code given valid data', async () => {
      const httpRequest = {
        body: { mockProduct },
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      const res = await productController.createProduct(httpRequest);
      const product = res.body;
      expect(res.statusCode).toBe(201);
      expect(product._id).toBeTruthy();
      expect(product.description).toBe('something');
      expect(product.price).toBe(10000);
      expect(product.brand).toBe('generic');
      expect(product.category).toBe('generic');
      expect(product.weight).toBe('10 kg');
      expect(product.dimensions).toBe('50 x 50 x 50');
      expect(product.releaseDate).toBe(2010);
      expect(product.stock).toBe(10);
    });
  });

  describe('RetrieveProduct', () => {
    it('must return a product with 200 status code given a valid product name', async () => {
      const httpRequest = {
        body: {
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
      expect(product.category).toBe('generic');
      expect(product.weight).toBe('10 kg');
      expect(product.dimensions).toBe('50 x 50 x 50');
      expect(product.releaseDate).toBe(2010);
      expect(product.stock).toBe(10);
    });

    it('must return an error message with 400 status code if order is not found', async () => {
      const httpRequest = {
        body: {
          name: 'wrong name',
        },
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      const res = await productController.retrieveProduct(httpRequest);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('No products with this name found');
    });
  });

  describe('updateProduct', () => {
    it('must update an order with 200 status code given valid data', async () => {
      const httpRequest = {
        body: {},
      };
    });
  });

  describe('deleteProduct', () => {
    it('must delete a product with 200 status code given valid data', async () => {
      const httpRequest = {
        body: {},
      };
    });
  });
});
