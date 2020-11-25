import { ProductController } from '../../../../src/domain/controllers/product-controller';
import { makeProductController } from '../../../../src/domain/controllers/factories/product-controller-factory';

describe('makeProductController', () => {
  it('must return a ProductController with correct dependencies', () => {
    const sut = makeProductController();
    expect(sut).toBeInstanceOf(ProductController);
  });
});
