import { ProductController } from '../../../../src/domain/controllers/product-controller';
import { MongoHelper } from '../../../../src/application/helpers/mongoHelper';
import { ProductRepository } from '../../../../src/application/database/mongodb/product-repository';

let productCollection;

const makeImageUploaderService = () => {
  class ImageUploaderServiceStub {
    async execute(fileName) {
      return new Promise((resolve) => resolve('pressigned_url'));
    }
  }
  return new ImageUploaderServiceStub();
};

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
      const imageUploaderServiceStub = makeImageUploaderService();
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository, imageUploaderServiceStub);
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

    it('must return with 500 status code given duplicate data', async () => {
      const httpRequest = {
        body: { mockProduct },
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      await productController.createProduct(httpRequest);
      const res = await productController.createProduct(httpRequest);
      expect(res.statusCode).toBe(500);
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
      expect(res.body.message).toBe('No products with this query found');
    });
  });

  describe('retrieveAll', () => {
    it('must return all products with 200 status code given valid data', async () => {
      const httpRequest = {
        body: {},
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      productCollection.insertOne(mockProduct);
      const res = await productController.retrieveAll();
      expect(res.statusCode).toBe(200);
      expect(res.body[0]._id).toBeTruthy();
      expect(res.body[0].name).toBe('abc');
      expect(res.body[0].description).toBe('something');
      expect(res.body[0].price).toBe(10000);
    });
  });

  describe('updateProduct', () => {
    it('must update an order with 200 status code given valid data', async () => {
      const httpRequest = {
        body: {
          updateQuery: { name: 'abc' },
          updatedValues: {
            $set: {
              name: 'ps5',
              price: 5000,
              brand: 'sony',
              releaseDate: 2020,
            },
          },
        },
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      productCollection.insertOne(mockProduct);
      const res = await productController.updateProduct(httpRequest);
      expect(res.statusCode).toBe(200);
    });

    it('must return an order with 400 status code given invalid data', async () => {
      const httpRequest = {
        body: {
          updateQuery: { name: 'abc' },
          updatedValues: {
            $set: {
              name: 'ps5',
            },
          },
        },
      };
      const productRepository = new ProductRepository();
      const productController = new ProductController(productRepository);
      const res = await productController.updateProduct(httpRequest);
      expect(res.statusCode).toBe(400);
    });

    describe('deleteProduct', () => {
      it('must delete a product with 200 status code given valid data', async () => {
        const httpRequest = {
          body: {
            deleteQuery: { name: 'abc' },
          },
        };
        const productRepository = new ProductRepository();
        const productController = new ProductController(productRepository);
        productCollection.insertOne(mockProduct);
        const res = await productController.deleteProduct(httpRequest);
        expect(res.statusCode).toBe(200);
      });
      it('must delete a product with 400 status code given invalid data', async () => {
        const httpRequest = {
          body: {
            deleteQuery: { name: 'abc' },
          },
        };
        const productRepository = new ProductRepository();
        const productController = new ProductController(productRepository);
        const res = await productController.deleteProduct(httpRequest);
        expect(res.statusCode).toBe(400);
      });
    });
  });
});
