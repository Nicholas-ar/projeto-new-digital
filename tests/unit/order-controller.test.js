import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
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
  }
  return new RepositoryStub();
};

const makeSut = () => {
  const repositoryStub = makeRepository();
  const sut = new OrderController(repositoryStub);
  return { sut, repositoryStub };
};

const makeFakeOrder = () => ({
  email: 'valid_email@email.com',
  cpf: 12345612312,
  tid: 2134534253252,
  delivered: false,
});

describe('Order controller', () => {
  it('It must load an order', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      cpf: 12345612312,
    };
    const httpResponse = await sut.handleRetrival(httpRequest);
    expect(httpResponse).toEqual(HTTP_OK_200(makeFakeOrder()));
  });

  it('It must return an error message if order is not found', async () => {
    const { sut, repositoryStub } = makeSut();
    jest.spyOn(repositoryStub, 'retriveByCpf').mockReturnValueOnce(null);
    const httpRequest = {
      cpf: 26306359028,
    };
    const httpResponse = await sut.handleRetrival(httpRequest);
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
    await sut.handleRetrival(httpRequest);
    expect(repositorySpy).toHaveBeenCalledWith(httpRequest.cpf);
  });
});
