/**
 * @typedef Order
 * @property {String} _id
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {Boolean} delivered
 */
export const Order = {
  _id: String,
  cpf: String,
  email: String,
  tid: String,
  delivered: Boolean,
};

/**
 * @typedef OrderData
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {Boolean} delivered
 */
export const OrderData = {
  cpf: String,
  email: String,
  tid: String,
  delivered: Boolean,
};
