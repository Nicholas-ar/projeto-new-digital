import { OrdersMongoRepository } from '../../../application/database/mongodb/orders-mongo-repository';
import ValidarCpf from '../../services/cpf-validator';
import RedecardPaymentAdapter from '../../../application/services/payment/erede-payment-adapter';
import OrderController from '../order-controller';

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
