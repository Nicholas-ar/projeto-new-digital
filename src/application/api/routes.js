import Router from 'express';
import {makeOrderController} from '../../domain/controllers/factories/order-controller-factory';

const router = Router();
const orderController = makeOrderController();
router.get('/orders', orderController.list);

export default router;