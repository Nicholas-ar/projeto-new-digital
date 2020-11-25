import Router from 'express';
import { makeOrderController } from '../../../domain/controllers/factories/order-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';

export const orderRoutes = Router();

orderRoutes.get('/orders', expressRouterAdapter(makeOrderController(), 'list'));
orderRoutes.get(
  '/order',
  expressRouterAdapter(makeOrderController(), 'retrieveOrder')
);
orderRoutes.post(
  '/orders',
  expressRouterAdapter(makeOrderController(), 'createOrder')
);
orderRoutes.patch(
  '/updateOrder',
  expressRouterAdapter(makeOrderController(), 'updateOrder')
);

orderRoutes.get(
  '/orders/:id',
  expressRouterAdapter(makeOrderController(), 'retrieveOrderById')
);
