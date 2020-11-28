import { ObjectID } from 'mongodb';

/**
 * @typedef Order
 * @property {ObjectID} _id
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {Boolean} delivered
 * @property {String} date
 * @property {Number} price
 * @property {Array<Object>} cartItems
 */
export const Order = {
  _id: ObjectID,
  cpf: String,
  email: String,
  tid: String,
  delivered: Boolean,
  date: String,
  price: Number,
  cartItems: Array(Object),
};

/**
 * @typedef OrderData
 * @property {String} cpf
 * @property {String} email
 * @property {String} tid
 * @property {Boolean} delivered
 * @property {String} date
 * @property {Number} price
 * @property {Array<Object>} cartItems
 */
export const OrderData = {
  cpf: String,
  email: String,
  tid: String,
  delivered: Boolean,
  date: String,
  price: Number,
  cartItems: Array(Object),
};
