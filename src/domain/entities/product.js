import { ObjectID } from 'mongodb';

/**
 * @typedef Product
 * @property {ObjectID} _id
 * @property {String} name
 * @property {String} description
 * @property {Number} price
 * @property {String} brand
 * @property {String} category
 * @property {String} weight
 * @property {String} dimensions
 * @property {Number} releaseDate
 * @property {Number} stock
 * @property {String} imageUrl
 * @property {String} qrCodeString
 */
export const Product = {
  _id: ObjectID,
  name: String,
  description: String,
  price: Number,
  brand: String,
  category: String,
  weight: String,
  dimensions: String,
  releaseDate: Number,
  stock: Number,
  imageUrl: String,
  qrCodeString: String,
};

/**
 * @typedef ProductData
 * @property {Object} product
 * @property {String} imageName
 * @property {String} name
 * @property {String} description
 * @property {Number} price
 * @property {String} brand
 * @property {String} category
 * @property {String} weight
 * @property {String} dimensions
 * @property {Number} releaseDate
 * @property {Number} stock
 * @property {String} imageUrl
 * @property {String} qrCodeString
 */
export const ProductData = {
  product: {
    name: String,
    description: String,
    price: Number,
    brand: String,
    category: String,
    weight: String,
    dimensions: String,
    releaseDate: Number,
    stock: Number,
    imageUrl: String,
    qrCodeString: String,
  },
  imageName: String,
};
