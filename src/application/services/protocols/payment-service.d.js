/**
 * @typedef PaymentData
 * @property {String} orderPrice
 * @property {String} orderReference
 * @property {String} cardNumber
 * @property {String} cvv
 * @property {String} expirationMonth
 * @property {String} expirationYear
 * @property {String} cardHolderName
 */
export const PaymentData = {
  orderPrice: String,
  orderReference: String,
  cardNumber: String,
  cvv: String,
  expirationMonth: String,
  expirationYear: String,
  cardHolderName: String,
};

/**
 * @abstract
 * @name PaymentService
 * @method pay
 */
export class PaymentService {
  constructor() {
    throw new Error('Not implemented');
  }

  /**
   * Makes a transaction with RedeCard, returning the TID if successful
   * @param {PaymentData} paymentData
   * @returns {Promise<String | Null>} Transaction ID
   */
  async pay(paymentData) {
    throw new Error('Not implemented');
  }
}
