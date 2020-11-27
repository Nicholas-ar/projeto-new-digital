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
        orderData: {
          properties: {
            email: { type: 'string' },
            cpf: { type: 'string' },
            delivered: { type: 'boolean' },
          },
        },
        paymentData: {
          properties: {
            orderPrice: { type: 'number' },
            orderReference: { type: 'number' },
            cardNumber: { type: 'string' },
            cvv: { type: 'string' },
            expirationMonth: { type: 'string' },
            expirationYear: { type: 'string' },
            cardHolderName: { type: 'string' },
          },
        },
      },
    },
  },
  required: [
    'query',
    'newValue',
    'email',
    'cpf',
    'delivered',
    'orderPrice',
    'orderReference',
    'cardNumber',
    'cvv',
    'expirationMonth',
    'expirationYear',
    'cardHolderName',
  ],
};
