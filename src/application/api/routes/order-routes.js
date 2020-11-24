import Router from 'express';
import { makeOrderController } from '../../../domain/controllers/factories/order-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/express-adapter';

export const orderRoutes = Router();

orderRoutes.get('/orders', expressRouterAdapter(makeOrderController(), 'list'));
orderRoutes.get(
  '/order',
  expressRouterAdapter(makeOrderController(), 'retrieveOrder')
);
orderRoutes.post(
  '/newOrder',
  expressRouterAdapter(makeOrderController(), 'createOrder')
);
orderRoutes.patch(
  '/updateOrder',
  expressRouterAdapter(makeOrderController(), 'updateOrder')
);

orderRoutes.get(
  '/order/:id',
  expressRouterAdapter(makeOrderController(), 'retrieveOrderById')
);
