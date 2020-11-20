import OrderController from '../../../../../src/domain/controllers/order-controller';
import { makeOrderController } from '../../../../../src/domain/controllers/factories/order-controller-factory';

describe('makeOrderController', () => {
  it('must return an OrderController with correct dependencies', () => {
    const sut = makeOrderController();
    expect(sut).toBeInstanceOf(OrderController);
  });
});
