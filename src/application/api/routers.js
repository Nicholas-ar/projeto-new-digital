import { Router } from 'express';
import { makeOrderController } from '../../domain/controllers/factories/order-controller-factory';
import { adaptRoute } from './express-adapter';
const routes = Router();

routes.get('/orders', adaptRoute(makeOrderController()));

export default routes;
