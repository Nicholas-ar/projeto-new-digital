export const orderParamsSchema = {
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
  required: [
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
