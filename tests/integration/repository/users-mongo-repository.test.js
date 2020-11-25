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

  it('must insert an user into users collection', async () => {
    const sut = makeSut();
    const account = await sut.create(makeFakeUserData());
    expect(account._id).toBeTruthy();
    expect(account.email).toBe('valid_email@email.com');
    expect(account.password).toBe('hashed_password');
  });

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
