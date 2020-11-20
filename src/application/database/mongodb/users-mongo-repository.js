import { MongoHelper } from '../../helpers/mongoHelper';

/**
 * Users repository for the Mongo database
 * @implements {Repository}
 */
export class UsersMongoRespository {
  /**
   * Creates a user document into Mongo database.
   * @param {import('../../services/authentication/database-user-authentication').User} userData
   */
  async create(userData) {
    const usersCollection = await MongoHelper.getCollection('users');
    const result = await usersCollection.insertOne(userData);
    return result.ops[0];
  }

  /**
   * Retrieves the first user from the database that matches the given email
   * @param {String} email 
   * @returns {Promise<import('../../services/authentication/database-user-authentication').User>}
   */
  async retrieveByEmail(email) {
    const usersCollection = await MongoHelper.getCollection('users');
    return await usersCollection.findOne({ email });
  }

  /**
   * Updates the User that matches the id in the database
   * adding the accessToken property
   * @param {String} id 
   * @param {String} token 
   */
  async updateAcessToken(id, token) {
    const usersCollection = await MongoHelper.getCollection('users');
    await usersCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } }
    );
  }
}
