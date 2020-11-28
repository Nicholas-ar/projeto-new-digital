import { OrderController } from "../../../../src/application/controllers";
import { makeOrderController } from "../../../../src/application/controllers/factories/order-controller-factory";

describe('makeOrderController', () => {
  it('must return an OrderController with correct dependencies', () => {
    const sut = makeOrderController();
    expect(sut).toBeInstanceOf(OrderController);
  });
});
