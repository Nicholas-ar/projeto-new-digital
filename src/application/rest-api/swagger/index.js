import { badRequest, unauthorized, notFound, serverError } from './components';
import { ordersIdPath } from './paths/orders-id-path';
import { ordersPath } from './paths/orders-path';
import { signinPath } from './paths/signin-path';
import { signupPath } from './paths/signup-path';
import { accountSchema } from './schemas/accountSchema';
import { errorSchema } from './schemas/error-schema';
import { ordersListResultSchema } from './schemas/order-list-result';
import { orderParamsSchema } from './schemas/order-params-schema';
import { orderPatchParamsSchema } from './schemas/order-patch-params-schema';
import { orderResultSchema } from './schemas/order-result-schema';
import { signinParamsSchema } from './schemas/signin-params-schema';
import { signupParamsSchema } from './schemas/signup-params-schema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'QRoBuy backend',
    description: 'Backend para a aplicação QRobuy',
    version: '1.0.0',
  },
  license: {
    name: 'MIT',
    url: 'https://raw.githubusercontent.com/Nicholas-ar/qrobuy-backend/main/LICENSE.md'
  },
  externalDocs: {
    description: 'Link para o README',
    url: 'https://raw.githubusercontent.com/Nicholas-ar/qrobuy-backend/main/README.md'
  },
  servers: [
    {
      url: '/api/v1',
    },
  ],
  tags: [
    {
      name: 'Sign In',
    },
    {
      name: 'Sign Up',
    },
    {
      name: 'Orders',
    },
  ],
  paths: {
    '/signin': signinPath,
    '/signup': signupPath,
    '/orders/{id}': ordersIdPath,
    '/orders': ordersPath,
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    signinParams: signinParamsSchema,
    orderParams: orderParamsSchema,
    order: orderResultSchema,
    orderList: ordersListResultSchema,
    orderPatchParams: orderPatchParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    unauthorized,
    notFound,
    serverError,
  },
};
