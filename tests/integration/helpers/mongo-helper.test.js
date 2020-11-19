import { MongoHelper } from '../../../src/application/helpers/mongoHelper';

describe('Mongo helper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  it('must reconnect if mongodb is down', async () => {
    let orderCollection = await MongoHelper.getCollection('orders');
    expect(orderCollection).toBeTruthy();
    await MongoHelper.disconnect();
    orderCollection = await MongoHelper.getCollection('orders');
    expect(orderCollection).toBeTruthy();
  });
});
