import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500
} from '../../src/helpers/http-helper';
import OrderController from '../../src/orders/controller/order-controller';

const makeRepository = () => {
  class RepositoryStub {
    async retriveByCpf(cpf) {
      return {
        email: 'valid_email@email.com',
        cpf,
        tid: 2134534253252,
        delivered: false,
      };
    }
    async create(data) {
      return {
        _id: 1,
        email: 'valid_email@email.com',
        cpf: 12345612312,
        tid: 2134534253252,
        delivered: false,
      };
    }
    async update(query) {
      return {
        _id: 1,
        email: 'valid_email@email.com',
        cpf: 12345612312,
        tid: 2134534253252,
        delivered: true,
      };
    }
  }

  return new RepositoryStub();
};

const makeSut = () => {
  const repositoryStub = makeRepository();
  const sut = new OrderController(repositoryStub);
  return { sut, repositoryStub };
};

const makeFakeRequest = () => ({
  email: 'valid_email@email.com',
  cpf: 12345612312,
  tid: 2134534253252,
  delivered: false,
});

const makeFakeOrder = () => ({
  _id: 1,
  email: 'valid_email@email.com',
  cpf: 12345612312,
  tid: 2134534253252,
  delivered: false,
});

describe('Order controller', () => {
  it('It must load an order with 200 status code', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      cpf: 12345612312,
    };
    const httpResponse = await sut.retrieveOrder(httpRequest);
    expect(httpResponse).toEqual(HTTP_OK_200(makeFakeRequest()));
  });

  it('It must return an error message and 400 status code if order is not found', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'retriveByCpf').mockReturnValueOnce(null);
    const httpRequest = {
      cpf: 26306359028,
    };
    const httpResponse = await sut.retrieveOrder(httpRequest);
    expect(httpResponse).toEqual(
      HTTP_BAD_REQUEST_400({ message: 'Invalid param: cpf' })
    );
  });

  it('It must call Repository with correct value', async () => {
    const { sut, repositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, 'retriveByCpf');
    const httpRequest = {
      cpf: 26306359028,
    };
    await sut.retrieveOrder(httpRequest);
    expect(repositorySpy).toHaveBeenCalledWith(httpRequest.cpf);
  });

  it('It must return 500 if retriveByCpf throws an error', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'retriveByCpf').mockImplementationOnce(new Error());
    const httpRequest = {
      cpf: 26306359028,
    };
    const httpResponse = await sut.retrieveOrder(httpRequest);
    expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
  });

  it('it must create an order with 201 status code given valid data', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.createOrder(httpRequest);
    expect(httpResponse).toEqual(HTTP_CREATED_201(makeFakeOrder()));
  });

  it('it must call Repository with correct order value', async () => {
    const { sut, repositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, 'create');
    const httpRequest = makeFakeRequest();
    await sut.createOrder(httpRequest);
    expect(repositorySpy).toHaveBeenCalledWith(httpRequest);
  });

  it('It must return 500 if create throws an error', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'create').mockImplementationOnce(new Error());
    const httpResponse = await sut.createOrder(makeFakeRequest());
    expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
  });


  it('it must update an order with 200 status code given valid data', async () => {
    const { sut } = makeSut();
    const httpRequest = { delivered: true };
    const httpResponse = await sut.updateOrder(httpRequest);
    expect(httpResponse).toEqual(
      HTTP_OK_200({
        _id: 1,
        email: 'valid_email@email.com',
        cpf: 12345612312,
        tid: 2134534253252,
        delivered: true,
      })
    );
  });

  it('it must call Repository with correct update order value', async () => {
    const { sut, repositoryStub } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, 'update');
    const httpRequest = makeFakeRequest();
    await sut.updateOrder(httpRequest);
    expect(repositorySpy).toHaveBeenCalledWith(httpRequest);
  });

  it('it must return 400 status code if updateOrder returns null', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'update').mockReturnValueOnce(null);
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.updateOrder(httpRequest);
    expect(httpResponse).toEqual(
      HTTP_BAD_REQUEST_400({ message: 'Invalid param' })
    );
  });

  it('It must return 500 if update throws an error', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'update').mockImplementationOnce(new Error());
    const httpResponse = await sut.updateOrder(makeFakeRequest());
    expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
  });
});
