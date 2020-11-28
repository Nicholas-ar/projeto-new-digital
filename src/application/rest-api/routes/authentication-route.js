import Router from 'express';
import { makeSignInController } from '../../controllers/factories/signin-controller-factory';
import { makeSignUpController } from '../../controllers/factories/signup-controller-factory';
import { expressRouterAdapter } from '../../services/adapters/web/express-adapter';

export const authenticationRoutes = Router();

authenticationRoutes.post(
  '/signin',
  expressRouterAdapter(makeSignInController(), 'execute')
);

authenticationRoutes.post(
  '/signup',
  expressRouterAdapter(makeSignUpController(), 'execute')
);
