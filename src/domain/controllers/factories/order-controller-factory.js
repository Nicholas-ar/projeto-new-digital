import { OrdersMongoRepository } from '../../../application/database/mongodb';
import { ValidarCpf } from '../../../application/services/validators';
import RedecardPaymentAdapter from '../../../application/services/adapters/payment/erede-payment-adapter';
import { OrderController } from '../index';

/**
 * Factory for the SignIpController.
 * Instantiates all required dependencies and injects it into the SignInController object.
 * @returns {OrderController} - OrderController Object
 */
export const makeOrderController = () => {
  const repository = new OrdersMongoRepository();
  const cpfValidator = new ValidarCpf();
  const paymentAdapter = new RedecardPaymentAdapter();

  return new OrderController(repository, cpfValidator, paymentAdapter);
};
