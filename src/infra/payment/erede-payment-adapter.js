const eRede = require('erede-node/lib/erede');
const Transaction = require('erede-node/lib/transaction');
const Store = require('erede-node/lib/store');
const Environment = require('erede-node/lib/environment');

require('dotenv').config();

const inProduction = process.env.NODE_ENV == 'production';

export default class RedecardPaymentAdapter {
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

      return this._makePaymentRequest(store, transaction);
    } catch (error) {
      throw error;
    }
  }

  _makeStore() {
    return new Store(
      process.env.REDECARD_TOKEN,
      process.env.REDECARD_PV,
      inProduction ? Environment.production() : Environment.sandbox()
    );
  }

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

  _makePaymentRequest(store, transaction) {
    new eRede(store).create(transaction).then((transaction) => {
      if (transaction.returnCode === '00') {
        return transaction.tid;
      }
    });
  }
}
