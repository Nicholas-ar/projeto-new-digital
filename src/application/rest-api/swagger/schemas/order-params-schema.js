export const orderParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
    price: {
      type: 'integer',
    },
    date: {
      type: 'string',
    },
  },
  required: ['email', 'name', 'cpf', 'price', 'date'],
};
