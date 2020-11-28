import { ProductController } from '../../../../src/application/controllers';
import { makeProductController } from '../../../../src/application/controllers/factories/product-controller-factory';

describe('makeProductController', () => {
  it('must return a ProductController with correct dependencies', () => {
    const sut = makeProductController();
    expect(sut).toBeInstanceOf(ProductController);
  });
});
