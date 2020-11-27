import { User, UserData } from '../../../domain/entities/user';
import { MongoHelper } from '../../helpers/mongo-helper';

/**
 * Users repository for the Mongo database
 * @method create
 * @method retrieveByEmail
 * @method updateAcessToken
 *
 */
export class UsersMongoRespository {
  /**
   * Creates a user document into Mongo database.
   * @param {UserData} userData
   * @returns {Promise<User>}
   */
  async create(userData) {
    const usersCollection = await MongoHelper.getCollection('users');
    const result = await usersCollection.insertOne(userData);
    console.log(result.ops[0])
    return result.ops[0];
  }

  /**
   * Retrieves the first user from the database that matches the given email
   * @param {String} email
   * @returns {Promise<User>}
   */
  async retrieveByEmail(email) {
    const usersCollection = await MongoHelper.getCollection('users');
    return await usersCollection.findOne({ email });
  }

  /**
   * Retrieves the first user from the database that matches the given email
   * @param {Object} accessToken
   * @param {boolean} role
   * @returns {Promise<User>}
   */
  async retrieveByToken(accessToken, role) {
    const usersCollection = await MongoHelper.getCollection('users');
    return await usersCollection.findOne({ accessToken });
  }

  /**
   * Updates the User that matches the id in the database
   * adding the accessToken property
   * @param {String} id
   * @param {String} token
   */
  async updateAccessToken(id, token) {
    const usersCollection = await MongoHelper.getCollection('users');
    await usersCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } }
    );
    await usersCollection.findOne({ _id: id });
  }
}
