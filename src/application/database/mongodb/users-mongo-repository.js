import { MongoHelper } from '../../helpers/mongoHelper';

export class UsersMongoRespository {
  async create(userData) {
    const usersCollection = await MongoHelper.getCollection('users');
    const result = await usersCollection.insertOne(userData);
    return result.ops[0];
  }

  async retrieveByEmail(email) {
    const usersCollection = await MongoHelper.getCollection('users');
    return await usersCollection.findOne({ email });
  }

  async updateAcessToken(id, token) {
    const usersCollection = await MongoHelper.getCollection('users');
    await usersCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } }
    );
  }
}
