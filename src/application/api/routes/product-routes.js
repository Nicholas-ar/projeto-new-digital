import Router from 'express';
import { makeOrderController } from '../../../domain/controllers/factories/order-controller-factory';
import { makeProductController } from '../../../domain/controllers/factories/product-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/express-adapter';

export const productRoutes = Router();

productRoutes.get(
  '/products',
  expressRouterAdapter(makeProductController(), 'retrieveAll')
);
productRoutes.get(
  '/product',
  expressRouterAdapter(makeProductController(), 'retrieveProduct')
);
productRoutes.post(
  '/newProduct',
  expressRouterAdapter(makeProductController(), 'createProduct')
);
productRoutes.patch(
  '/updateProduct',
  expressRouterAdapter(makeOrderController(), 'updateProduct')
);
productRoutes.delete(
  '/deleteProduct',
  expressRouterAdapter(makeOrderController(), 'deleteProduct')
);
