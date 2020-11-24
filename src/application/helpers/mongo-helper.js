import { MongoClient } from 'mongodb';

/**
 * @typedef { import('mongodb').Collection } MongoCollection
 */

/**
 * Allows MongoClient interactions
 * @method connect - Allows connection with MongoDB
 * @method disconnect - Disconnects from MongoDB
 * @method getCollection - Getter for a specific colection
 */
export const MongoHelper = {
  
  /**
   * Async function that connects to MongoDB using an URI string as parameter.
   * @param {String} uri - Complete URI of MongoDB
   */
   async connect(uri) {
    this.uri = uri;
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.client = await MongoClient.connect(uri, mongoOptions);
  },

  /**
   * Async function that disconnects from MongoDB, closing the existing
   * instance an stting the client to null ensuring complete disconnection.
   */
  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  /**
   * Async function that returns a specific collection that is passed as string.
   * If the database is not connected, it tries to reconnect before retrieving.
   * @param {String} collectionName - Name of the collection
   * @returns {Promise<MongoCollection>} - MongoDB collection
   */
  async getCollection(collectionName) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(collectionName);
  },
};
