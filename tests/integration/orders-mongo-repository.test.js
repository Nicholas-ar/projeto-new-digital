import { MongoHelper } from '../../src/helpers/mongoHelper';
import { OrderMongoRepository } from '../../src/orders/repository/orders-mongo-repository';
let orderCollection;

describe('Order Controller', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  const makeFakeOrder = () => ({
    email: 'valid_email@email.com',
    cpf: 12345612312,
    tid: 2134534253252,
    delivered: false,
  });
  const makeSut = () => new OrderMongoRepository();
  it('must insert an order into orders collection', async () => {
    const sut = makeSut();
    await sut.create(makeFakeOrder());
    const order = await orderCollection.findOne({
      email: 'valid_email@email.com',
    });
    expect(order._id).toBeTruthy();
    expect(order.email).toBe('valid_email@email.com');
    expect(order.cpf).toBe(12345612312);
    expect(order.tid).toBe(2134534253252);
    expect(order.delivered).toBe(false);
  });

  it('must call create with correct data', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();
    const createSpy = jest.spyOn(sut, 'create');
    await sut.create(fakeOrderData);
    expect(createSpy).toHaveBeenCalledWith(fakeOrderData);
  });

  it('must retrieve inserted order data', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();

    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.insertOne(fakeOrderData);

    const order = await sut.retrieveByCpf(fakeOrderData.cpf);
    expect(order._id).toBeTruthy();
    expect(order.email).toBe('valid_email@email.com');
    expect(order.cpf).toBe(12345612312);
    expect(order.delivered).toBe(false);
    expect(order.tid).toBe(2134534253252);
  });

  it('must call retrieveByCpf with correct data', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();
    const retrieveByCpfSpy = jest.spyOn(sut, 'retrieveByCpf');
    await sut.retrieveByCpf(fakeOrderData.cpf);
    expect(retrieveByCpfSpy).toHaveBeenCalledWith(fakeOrderData.cpf);
  });

  it('must list all documents', async () => {
    const sut = makeSut();

    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.insertOne(makeFakeOrder());
    await orderCollection.insertOne(makeFakeOrder());

    const orders = await sut.list();
    expect(orders.length).toBe(2);
  });

  it('must call update with correct data', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();
    const updateSpy = jest.spyOn(sut, 'retrieveByCpf');
    await sut.retrieveByCpf(fakeOrderData.cpf, { delivered: true });
    expect(updateSpy).toHaveBeenCalledWith(fakeOrderData.cpf, { delivered: true });
  });

  it('must update a document given an existing cpf', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();

    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.insertOne(fakeOrderData);

    await sut.update({cpf: fakeOrderData.cpf}, { delivered: true });

    const order = await orderCollection.findOne({email: 'valid_email@email.com'});

    expect(order._id).toBeTruthy();
    expect(order.email).toBe('valid_email@email.com');
    expect(order.cpf).toBe(12345612312);
    expect(order.delivered).toBe(true);
    expect(order.tid).toBe(2134534253252);
  });

  it('must delete the first document given an existing cpf', async () => {
    const sut = makeSut();
    const fakeOrderData = makeFakeOrder();

    const orderCollection = await MongoHelper.getCollection('orders');
    await orderCollection.insertOne(makeFakeOrder());
    await orderCollection.insertOne(makeFakeOrder());


    await sut.delete(fakeOrderData);

    const order = await orderCollection.find({}).toArray();

    expect(order).toHaveLength(1)
  });
});
