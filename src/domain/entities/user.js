import { ObjectID } from 'mongodb';

/**
 * @typedef User
 * @property {ObjectID} _id
 * @property {string} email
 * @property {string} password
 * @property {String} accessToken
 * @property {Boolean} isAdmin
 */
export const User = {
  _id: String,
  email: String,
  password: String,
  accessToken: String,
  isAdmin: Boolean,
};

/**
 * @typedef UserData
 * @property {string} email
 * @property {string} password
 * @property {String} accessToken
 * @property {Boolean} isAdmin
 */
export const UserData = {
  email: String,
  password: String,
  accessToken: String,
  isAdmin: Boolean,
};
