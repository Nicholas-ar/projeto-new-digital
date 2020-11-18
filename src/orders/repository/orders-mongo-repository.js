import { MongoHelper } from '../../helpers/mongoHelper';

export class OrdersMongoRepository {
  async list() {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.find({}).toArray();
  }

  async retrieveByCpf(cpf) {
    const orderCollection = await MongoHelper.getCollection('orders');
    return await orderCollection.findOne({ cpf });
  }

  async create(orderData) {
    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.insertOne(orderData);
    return await orderCollection.findOne(orderData);
  }

  async update(query, newData) {
    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.update(query, { $set: newData });
  }

  async delete(query) {
    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.deleteOne(query);
  }
}
