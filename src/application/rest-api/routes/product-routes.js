import Router from 'express';
import { makeProductController } from '../../../domain/controllers/factories/product-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';

export const productRoutes = Router();

productRoutes.get(
  '/products',
  expressRouterAdapter(makeProductController(), 'retrieveAll')
);
productRoutes.post(
  '/product',
  expressRouterAdapter(makeProductController(), 'createProduct')
);
productRoutes.get(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'retrieveProduct')
);
productRoutes.patch(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'updateProduct')
);
productRoutes.delete(
  '/product/:_id',
  expressRouterAdapter(makeProductController(), 'deleteProduct')
);
