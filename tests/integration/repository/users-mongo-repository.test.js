import { UsersMongoRespository } from '../../../src/application/database/mongodb';
import { MongoHelper } from '../../../src/application/helpers/mongo-helper';

let usersCollection;
describe('Users Repository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    usersCollection = await MongoHelper.getCollection('users');
    await usersCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  const makeSut = () => new UsersMongoRespository();

  const makeFakeUserData = () => ({
    email: 'valid_email@email.com',
    password: 'hashed_password',
  });

  describe('create', () => {
    it('must insert an user into users collection', async () => {
      const sut = makeSut();
      const account = await sut.create(makeFakeUserData());
      expect(account._id).toBeTruthy();
      expect(account.email).toBe('valid_email@email.com');
      expect(account.password).toBe('hashed_password');
    });
  });

  describe('retrieveByEmail', () => {
    it('must return an user on retrieveByEmail', async () => {
      const sut = makeSut();
      await usersCollection.insertOne({
        email: 'valid_email@email.com',
        password: 'hashed_password',
      });
      const account = await sut.retrieveByEmail('valid_email@email.com');
      expect(account._id).toBeTruthy();
      expect(account.email).toBe('valid_email@email.com');
      expect(account.password).toBe('hashed_password');
    });

    it('must return null if retrieveByEmail fails', async () => {
      const sut = makeSut();
      const account = await sut.retrieveByEmail('valid_email@email.com');
      expect(account).toBeNull();
    });
  });

  describe('updateAccessToken', () => {
    it('must return true on updateAccessToken success', async () => {
      const sut = makeSut();
      const fakeUser = await usersCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'hashed_password',
      });
      const fakeAccount = fakeUser.ops[0];

      await sut.updateAccessToken(fakeAccount._id, 'any_token');

      const user = await usersCollection.findOne({ _id: fakeAccount._id });
      expect(user).toHaveProperty('accessToken');
      expect(user.accessToken).toBe('any_token');
    });
  });

  describe('retrieveByToken', () => {
    it('must return an admin user on retrieveByToken success', async () => {
      const sut = makeSut();
      await usersCollection.insertOne({
        email: 'valid_email@email.com',
        password: 'hashed_password',
        accessToken: 'any_token',
        isAdmin: true,
      });
      const account = await sut.retrieveByToken('any_token', true);
      expect(account._id).toBeTruthy();
      expect(account.email).toBe('valid_email@email.com');
      expect(account.password).toBe('hashed_password');
      expect(account.isAdmin).toBe(true);
    });

    it('must return an client user on retrieveByToken success', async () => {
      const sut = makeSut();
      await usersCollection.insertOne({
        email: 'valid_email@email.com',
        password: 'hashed_password',
        accessToken: 'any_token',
        isAdmin: false,
      });
      const account = await sut.retrieveByToken('any_token', false);
      expect(account._id).toBeTruthy();
      expect(account.email).toBe('valid_email@email.com');
      expect(account.password).toBe('hashed_password');
      expect(account.isAdmin).toBe(false);
    });

    it('must return null if retrieveByToken fails', async () => {
      const sut = makeSut();
      const account = await sut.retrieveByEmail('any_token');
      expect(account).toBeNull();
    });
  });
});
