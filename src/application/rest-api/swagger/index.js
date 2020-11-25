import { badRequest, unauthorized, notFound, serverError } from './components';
import { signinPath } from './paths/signin-path';
import { signupPath } from './paths/signup-path';
import { accountSchema } from './schemas/accountSchema';
import { errorSchema } from './schemas/error-schema';
import { signinParamsSchema } from './schemas/signin-params-schema';
import { signupParamsSchema } from './schemas/signupSchema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'QRoBuy backend',
    description: 'Backend para a aplicação QRobuy',
    version: '1.0.0',
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
  ],
  paths: {
    '/signin': signinPath,
    '/signup': signupPath,
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    signinParams: signinParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    unauthorized,
    notFound,
    serverError,
  },
};
