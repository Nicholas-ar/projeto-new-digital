import Router from 'express';
import { makeSignInController } from '../../../domain/controllers/factories/signin-controller-factory';
import { makeSignUpController } from '../../../domain/controllers/factories/signup-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/express-adapter';

export const authenticationRoutes = Router();

//rotas do Signin
authenticationRoutes.get(
  '/signin',
  expressRouterAdapter(makeSignInController(), 'execute')
);

//rotas Signup
authenticationRoutes.get(
  '/signup',
  expressRouterAdapter(makeSignUpController(), 'execute')
);
