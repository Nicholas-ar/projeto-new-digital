export const orderPatchParamsSchema = {
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
      },
    },
    newValue: {
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
        retrieved: {
          type: 'boolean',
        },
      },
    },
  },
  required: ['query', 'newValue', 'cpf', 'price', 'date'],
};
