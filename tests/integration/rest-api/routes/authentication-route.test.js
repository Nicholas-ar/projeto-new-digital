import request from 'supertest';
import app from '../../../../src/application/rest-api/app';
import { MongoHelper } from '../../../../src/application/helpers/mongoHelper';
import { hash } from 'argon2';

let usersCollection;
describe('authenticationRoutes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    usersCollection = await MongoHelper.getCollection('users');
    await usersCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  describe('SignUp route', () => {
    it('must return 200 on success', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          email: 'valid_email@gmail.com',
          password: 'valid_password',
        })
        .expect(201);
    });
  });
  describe('SignIn route', () => {
    it('must return a 200 on login', async () => {
      const password = await hash('valid_password');
      await usersCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@gmail.com',
        password,
      });
      await request(app)
        .get('/api/v1/signin')
        .send({
          email: 'valid_email@gmail.com',
          password: 'valid_password',
        })
        .expect(200);
    });

    it('must return a 401 on unauthorized login', async () => {
      const password = await hash('valid_password');
      await usersCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@gmail.com',
        password,
      });
      await request(app)
        .get('/api/v1/signin')
        .send({
          email: 'valid_email@gmail.com',
          password: 'another_password',
        })
        .expect(401);
    });
  });
});
