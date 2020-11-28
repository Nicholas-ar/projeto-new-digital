import Router from 'express';
import { makeAuthenticationMiddleware } from '../../controllers/factories/make-authentication-middleware';
import { makeOrderController } from '../../controllers/factories/order-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';
import { expressMiddlewareAdapter } from '../../services/adapters/web/express-middleware-adapter';

export const orderRoutes = Router();

const adminAuth = expressMiddlewareAdapter(makeAuthenticationMiddleware(true));

orderRoutes.get(
  '/orders',
  adminAuth,
  expressRouterAdapter(makeOrderController(), 'list')
);

orderRoutes.post(
  '/orders',
  expressRouterAdapter(makeOrderController(), 'createOrder')
);
orderRoutes.patch(
  '/orders/:_id',
  adminAuth,
  expressRouterAdapter(makeOrderController(), 'updateOrder')
);

orderRoutes.get(
  '/orders/:id',
  adminAuth,
  expressRouterAdapter(makeOrderController(), 'retrieveOrderById')
);

orderRoutes.get(
  '/user/orders/',
  expressRouterAdapter(makeOrderController(), 'listUserOrders')
);