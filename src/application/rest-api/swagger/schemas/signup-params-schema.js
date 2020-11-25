export const signupParamsSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    accessToken: {
      type: 'string',
    },
    isAdmin: {
      type: 'boolean',
    },
  },
  required: ['email', 'password'],
};
