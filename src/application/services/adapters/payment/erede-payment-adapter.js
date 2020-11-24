import env from '../../../config/environment';
import { PaymentData } from '../../protocols';

const eRede = require('erede-node/lib/erede');
const Transaction = require('erede-node/lib/transaction');
const Store = require('erede-node/lib/store');
const Environment = require('erede-node/lib/environment');



const inProduction = env.NODE_ENV == 'production' ;

/**
 * Payment adapter for the Redecard package
 * @method pay
 */
export default class RedecardPaymentAdapter {
  /**
   * Makes a transaction with RedeCard, returning the TID if successful
   * @param {PaymentData} paymentData
   * @returns {Promise<String | Null>} Transaction ID
   */
  async pay(paymentData) {
    try {
      const {
        orderPrice,
        orderReference,
        cardNumber,
        cvv,
        expirationMonth,
        expirationYear,
        cardHolderName,
      } = paymentData;
      let store = this._makeStore();
      let transaction = this._makeTransaction(
        orderPrice,
        orderReference,
        cardNumber,
        cvv,
        expirationMonth,
        expirationYear,
        cardHolderName
      );

      return await this._makePaymentRequest(store, transaction);
    } catch (error) {
      throw error;
    }
  }
  /**
   * @returns {Store}
   */
  _makeStore() {
    return new Store(
      env.REDECARD_TOKEN,
      env.REDECARD_PV,
      inProduction ? Environment.production() : Environment.sandbox()
    );
  }
  /**
   *
   * @param {String} orderPrice
   * @param {String} orderReference
   * @param {String} cardNumber
   * @param {String} cvv
   * @param {String} expirationMonth
   * @param {String} expirationYear
   * @param {String} cardHolderName
   * @returns {Transaction}
   */
  _makeTransaction(
    orderPrice,
    orderReference,
    cardNumber,
    cvv,
    expirationMonth,
    expirationYear,
    cardHolderName
  ) {
    return new Transaction(orderPrice, orderReference).creditCard(
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      cardHolderName
    );
  }
  /**
   *
   * @param {Store} store
   * @param {Transaction} transaction
   * @returns {Promise<String | Null>}
   */
  async _makePaymentRequest(store, transaction) {
    const result = await new eRede(store).create(transaction);
    if (result.returnCode === '00') return result.tid;
    return null;
  }
}
