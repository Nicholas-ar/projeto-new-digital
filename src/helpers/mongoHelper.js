import { MongoClient } from 'mongodb';

export const MongoHelper = {
  async connect(uri) {
    this.uri = uri;
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.client = await MongoClient.connect(uri, mongoOptions);
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(collectionName) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(collectionName);
  },
};
