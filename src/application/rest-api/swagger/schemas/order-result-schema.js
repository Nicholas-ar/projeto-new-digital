export const orderResultSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
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
};
