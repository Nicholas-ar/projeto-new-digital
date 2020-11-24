import {
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
} from '../../../../src/domain/helpers/http-helper';
import OrderController from '../../../../src/domain/controllers/order-controller';
import {
  InvalidParameterError,
  InvalidQueryError,
  OrderNotFoundError,
} from '../../../../src/domain/errors';
import { InvalidTransactionCredentialsError } from '../../../../src/domain/errors/invalid-transaction-credentials-error';

const makeRepository = () => {
  class RepositoryStub {
    async list() {
      return new Promise((resolve) => {
        resolve([
          {
            _id: '1',
            email: 'valid_email@email.com',
            cpf: '12345612312',
            tid: '2134534253252',
            delivered: false,
          },
          {
            _id: '2',
            email: 'valid_email@email.com',
            cpf: '12345612312',
            tid: '2134534253252',
            delivered: true,
          },
        ]);
      });
    }

    async retrieveByCpf(cpf) {
      return {
        _id: '1',
        email: 'valid_email@email.com',
        cpf,
        tid: '2134534253252',
        delivered: false,
      };
    }

    async create(data) {
      return {
        _id: '1',
        email: 'valid_email@email.com',
        cpf: '12345612312',
        tid: '2134534253252',
        delivered: false,
      };
    }

    async update(query) {
      return true;
    }
  }

  return new RepositoryStub();
};

const makeCpfValidator = () => {
  class ValidarCpfStub {
    validate(cpf) {
      return null;
    }
  }
  return new ValidarCpfStub();
};

const makePaymentAdapter = () => {
  class PaymentAdapterStub {
    pay(paymentData) {
      return 'transaction_id';
    }
  }
  return new PaymentAdapterStub();
};

const makeSut = () => {
  const repositoryStub = makeRepository();
  const cpfValidatorStub = makeCpfValidator();
  const paymentAdapterStub = makePaymentAdapter();
  const sut = new OrderController(
    repositoryStub,
    cpfValidatorStub,
    paymentAdapterStub
  );
  return { sut, repositoryStub, cpfValidatorStub, paymentAdapterStub };
};

const makeFakeRetrievalRequest = () => ({
  body: {
    cpf: '12345612312',
  },
});

describe('Order controller', () => {
  describe('list', () => {
    const makeHttpRequest = () => ({ body: {} });
    it('must list all orders returning a 200 status code', async () => {
      const { sut } = makeSut();
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.list(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_OK_200([
          {
            _id: '1',
            email: 'valid_email@email.com',
            cpf: '12345612312',
            tid: '2134534253252',
            delivered: false,
          },
          {
            _id: '2',
            email: 'valid_email@email.com',
            cpf: '12345612312',
            tid: '2134534253252',
            delivered: true,
          },
        ])
      );
    });

    it('must return 500 if list throws an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'list').mockImplementationOnce(new Error());
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.list(httpRequest);
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });

  describe('retrieveOrder', () => {
    it('must load an order with 200 status code', async () => {
      const { sut } = makeSut();
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.retrieveOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_OK_200({
          _id: '1',
          email: 'valid_email@email.com',
          cpf: '12345612312',
          tid: '2134534253252',
          delivered: false,
        })
      );
    });

    it('must call ValidarCPF with correct data', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      const cpfValidatorSpy = jest.spyOn(cpfValidatorStub, 'validate');
      const httpRequest = makeFakeRetrievalRequest();
      await sut.retrieveOrder(httpRequest);
      expect(cpfValidatorSpy).toHaveBeenCalledWith(httpRequest.body.cpf);
    });

    it('must return 500 if ValidarCPF throws an error', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      jest
        .spyOn(cpfValidatorStub, 'validate')
        .mockImplementationOnce(new Error());
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.retrieveOrder(httpRequest);
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });

    it('must return 400 status code if ValidarCPF returns InvalidParameterError', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      jest
        .spyOn(cpfValidatorStub, 'validate')
        .mockReturnValueOnce(new InvalidParameterError('cpf'));
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.retrieveOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new InvalidParameterError('cpf'))
      );
    });

    it('must return an error message and 400 status code if order is not found', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'retrieveByCpf').mockReturnValueOnce(null);
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.retrieveOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new OrderNotFoundError())
      );
    });

    it('It must call Repository with correct value', async () => {
      const { sut, repositoryStub } = makeSut();
      const repositorySpy = jest.spyOn(repositoryStub, 'retrieveByCpf');
      const httpRequest = makeFakeRetrievalRequest();
      await sut.retrieveOrder(httpRequest);
      expect(repositorySpy).toHaveBeenCalledWith(httpRequest.body.cpf);
    });

    it('must return 500 if retrieveOrder throws an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest
        .spyOn(repositoryStub, 'retrieveByCpf')
        .mockImplementationOnce(new Error());
      const httpRequest = makeFakeRetrievalRequest();
      const httpResponse = await sut.retrieveOrder(httpRequest);
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });

  describe('createOrder', () => {
    const makeFakeOrder = () => ({
      _id: '1',
      email: 'valid_email@email.com',
      cpf: '12345612312',
      tid: '2134534253252',
      delivered: false,
    });
    const makeHttpRequest = () => ({
      body: {
        orderData: {
          email: 'valid_email@email.com',
          cpf: '12345612312',
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
      },
    });

    it('it must create an order with 201 status code given valid data', async () => {
      const { sut } = makeSut();
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.createOrder(httpRequest);
      expect(httpResponse).toEqual(HTTP_CREATED_201(makeFakeOrder()));
    });

    it('must call ValidarCPF with correct data', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      const cpfValidatorSpy = jest.spyOn(cpfValidatorStub, 'validate');
      const httpRequest = makeHttpRequest();
      await sut.createOrder(httpRequest);
      expect(cpfValidatorSpy).toHaveBeenCalledWith(
        httpRequest.body.orderData.cpf
      );
    });

    it('It must return 500 if ValidarCPF throws an error', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      jest
        .spyOn(cpfValidatorStub, 'validate')
        .mockImplementationOnce(new Error());
      const httpResponse = await sut.createOrder(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });

    it('must return 400 status code if ValidarCPF returns false', async () => {
      const { sut, cpfValidatorStub } = makeSut();
      jest
        .spyOn(cpfValidatorStub, 'validate')
        .mockReturnValueOnce(new InvalidParameterError('cpf'));
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.createOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new InvalidParameterError('cpf'))
      );
    });

    it('It must return 500 if PaymentAdapter throws an error', async () => {
      const { sut, paymentAdapterStub } = makeSut();
      jest.spyOn(paymentAdapterStub, 'pay').mockImplementationOnce(new Error());
      const httpResponse = await sut.createOrder(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });

    it('must call PaymentAdapter with correct data', async () => {
      const { sut, paymentAdapterStub } = makeSut();
      const paySpy = jest.spyOn(paymentAdapterStub, 'pay');
      const httpRequest = makeHttpRequest();
      await sut.createOrder(httpRequest);
      expect(paySpy).toHaveBeenCalledWith(httpRequest.body.paymentData);
    });

    it('must return 400 status code if payment fails returning null', async () => {
      const { sut, paymentAdapterStub } = makeSut();
      jest.spyOn(paymentAdapterStub, 'pay').mockReturnValueOnce(null);
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.createOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new InvalidTransactionCredentialsError())
      );
    });

    it('must call Repository with correct order value', async () => {
      const { sut, repositoryStub } = makeSut();
      const repositorySpy = jest.spyOn(repositoryStub, 'create');
      const httpRequest = makeHttpRequest();
      await sut.createOrder(httpRequest);
      expect(repositorySpy).toHaveBeenCalledWith({
        cpf: '12345612312',
        delivered: false,
        email: 'valid_email@email.com',
        transactionId: 'transaction_id',
      });
    });

    it('must return 500 if create throws an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'create').mockImplementationOnce(new Error());
      const httpResponse = await sut.createOrder(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });

  describe('updateOrder', () => {
    const makeHttpRequest = () => ({
      body: { query: { _id: '1' }, newValue: { delivered: true } },
    });

    it('must update an order with 200 status code given valid data', async () => {
      const { sut } = makeSut();
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.updateOrder(httpRequest);
      expect(httpResponse).toEqual(HTTP_OK_200(true));
    });

    it('must call Repository with correct update order value', async () => {
      const { sut, repositoryStub } = makeSut();
      const repositorySpy = jest.spyOn(repositoryStub, 'update');
      const httpRequest = makeHttpRequest();
      await sut.updateOrder(httpRequest);
      expect(repositorySpy).toHaveBeenCalledWith(
        { _id: '1' },
        { delivered: true }
      );
    });

    it('must return 400 status code if updateOrder returns false', async () => {
      const { sut, repositoryStub } = makeSut();
      jest
        .spyOn(repositoryStub, 'update')
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(false)));
      const httpRequest = makeHttpRequest();
      const httpResponse = await sut.updateOrder(httpRequest);
      expect(httpResponse).toEqual(
        HTTP_BAD_REQUEST_400(new InvalidQueryError())
      );
    });

    it('must return 500 if update throws an error', async () => {
      const { sut, repositoryStub } = makeSut();
      jest.spyOn(repositoryStub, 'update').mockImplementationOnce(new Error());
      const httpResponse = await sut.updateOrder(makeHttpRequest());
      expect(httpResponse).toEqual(HTTP_SERVER_ERROR_500(new Error()));
    });
  });
});
