import Router from 'express';
import {makeOrderController} from '../../domain/controllers/factories/order-controller-factory';
import {makeSignInController} from '../../domain/controllers/factories/signin-controller-factory';
import {makeSignUpController} from '../../domain/controllers/factories/signup-controller-factory';
import {makeProductController} from '../../domain/controllers/factories/product-controller-factory';
import { expressRouterAdapter } from './express-adapter';

const router = Router();

//rotas do Order
router.get('/orders', expressRouterAdapter(makeOrderController(), 'list'));
router.get('/order', expressRouterAdapter(makeOrderController(), 'retrieveOrder'));
router.post('/newOrder',expressRouterAdapter(makeOrderController(), 'createOrder'));
router.patch('/updateOrder',expressRouterAdapter(makeOrderController(), 'updateOrder'));

//rotas do Signin
router.get('/signin', expressRouterAdapter(makeSignInController(), 'execute'));

//rotas Signup
router.get('/signup', expressRouterAdapter(makeSignUpController(), 'execute'));

//rotas Product 
router.get('/products', expressRouterAdapter(makeProductController(), 'retrieveAll'));
router.get('/product', expressRouterAdapter(makeProductController(), 'retrieveProduct'));
router.post('/newProduct', expressRouterAdapter(makeProductController(), 'createProduct'));


export default router;
