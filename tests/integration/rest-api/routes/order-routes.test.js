import request from 'supertest';
import app from '../../../../src/application/rest-api/app';
import { MongoHelper } from '../../../../src/application/helpers/mongoHelper';

const makeFakeOrders = () => [
  {
    _id: '1',
    name: 'John Doe',
    email: 'valid_email@email.com',
    cpf: '12595312790',
    tid: '2134534253252',
    retrieved: false,
    price: 28923,
    date: '16/11/2020',
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'valid_email@email.com',
    cpf: '12595312790',
    tid: '2134534253252',
    retrieved: false,
    price: 28900,
    date: '16/11/2020',
  },
];

let ordersCollection;
describe('authenticationRoutes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL));

  beforeEach(async () => {
    ordersCollection = await MongoHelper.getCollection('orders');
    await ordersCollection.deleteMany({});
  });

  afterAll(async () => await MongoHelper.disconnect());

  describe('Orders route', () => {
    it('must return 200 on retrieving orders list', async () => {
      await ordersCollection.insertMany(makeFakeOrders());
      const response = await request(app).get('/api/v1/orders').expect(200);
      expect(response.body).toEqual([
        {
          _id: '1',
          name: 'John Doe',
          email: 'valid_email@email.com',
          cpf: '12595312790',
          tid: '2134534253252',
          retrieved: false,
          price: 28923,
          date: '16/11/2020',
        },
        {
          _id: '2',
          name: 'John Doe',
          email: 'valid_email@email.com',
          cpf: '12595312790',
          tid: '2134534253252',
          retrieved: false,
          price: 28900,
          date: '16/11/2020',
        },
      ]);
    });

    it('must return a 201 and retrun an order document', async () => {
      const result = await request(app)
        .post('/api/v1/newOrder')
        .send({
          orderData: {
            email: 'valid_email@email.com',
            cpf: '12595312790',
            delivered: false,
          },
          paymentData: {
            orderPrice: 10,
            orderReference: Math.floor(Math.random() * 10001),
            cardNumber: '5448280000000007',
            cvv: '235',
            expirationMonth: '12',
            expirationYear: '2020',
            cardHolderName: 'Fulano de Tal',
          },
        })
        .expect(201);
      expect(result.body).toBeTruthy();
      expect(result.body._id).toBeTruthy();
      expect(result.body.email).toBe('valid_email@email.com');
      expect(result.body.cpf).toBe('12595312790');
      expect(result.body.delivered).toBeFalsy();
      expect(result.body.transactionId).toBeTruthy();
    });

    it('must update an order retuning a 200', async () => {
      await ordersCollection.insertMany(makeFakeOrders());
      const response = await request(app)
        .patch('/api/v1/updateOrder')
        .send({
          query: {
            _id: '1',
          },
          newValue: {
            retrieved: true,
          },
        })
        .expect(200);
      expect(response.body).toEqual({
        _id: '1',
        cpf: '12595312790',
        date: '16/11/2020',
        email: 'valid_email@email.com',
        name: 'John Doe',
        price: 28923,
        retrieved: true,
        tid: '2134534253252',
      });
    });

    it('must retrieveOrderById returning a 200', async () => {
      await ordersCollection.insertMany(makeFakeOrders());
      const response = await request(app).get('/api/v1/order/2').expect(200);
      expect(response.body).toEqual({
        _id: '2',
        name: 'John Doe',
        email: 'valid_email@email.com',
        cpf: '12595312790',
        tid: '2134534253252',
        retrieved: false,
        price: 28900,
        date: '16/11/2020',
      });
    });
  });
});
