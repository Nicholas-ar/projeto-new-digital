import Router from 'express';
import { makeAuthenticationMiddleware } from '../../../domain/controllers/factories/make-authentication-middleware';
import { makeOrderController } from '../../../domain/controllers/factories/order-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';
import { expressMiddlewareAdapter } from '../../services/adapters/web/express-middleware-adapter';

export const orderRoutes = Router();

const adminAuth = expressMiddlewareAdapter(makeAuthenticationMiddleware(true));

orderRoutes.get('/orders', adminAuth, expressRouterAdapter(makeOrderController(), 'list'));
orderRoutes.get(
  '/order',
  expressRouterAdapter(makeOrderController(), 'retrieveOrder')
);
orderRoutes.post(
  '/orders',
  expressRouterAdapter(makeOrderController(), 'createOrder')
);
orderRoutes.patch(
  '/orders/:_id',
  expressRouterAdapter(makeOrderController(), 'updateOrder')
);

orderRoutes.get(
  '/orders/:id',
  expressRouterAdapter(makeOrderController(), 'retrieveOrderById')
);
