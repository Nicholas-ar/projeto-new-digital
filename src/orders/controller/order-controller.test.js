import OrderController from './order-controller';

const makeRepository = () => {
  class Repository {
    async retriveByCpf(cpf) {
      return {
        email: 'valid_email@email.com',
        cpf,
        tid: 2134534253252,
        delivered: false,
      };
    }
  }
  return new Repository();
};

describe('Order controller', () => {
  it('It must load an order', async () => {
    const orderController = new OrderController(makeRepository());
    const httpRequest = {
      cpf: 12345612312,
    };
    const httpResponse = await orderController.handleRetrival(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        email: 'valid_email@email.com',
        cpf: 12345612312,
        tid: 2134534253252,
        delivered: false,
      },
    });
  });

  it('It must return um erro message if order not found', async () => {
    const repositorySpy = makeRepository();
    jest.spyOn(repositorySpy, 'retriveByCpf').mockReturnValueOnce(null);
    const orderController = new OrderController(repositorySpy);
    const httpRequest = {
      cpf: 26306359028,
    };
    const httpResponse = await orderController.handleRetrival(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: {
        message: 'Invalid param : cpf',
      },
    });
  });
});
