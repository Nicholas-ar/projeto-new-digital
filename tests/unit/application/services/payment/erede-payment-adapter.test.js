import RedecardPaymentAdapter from '../../../../../src/application/services/adapters/payment/erede-payment-adapter';
const makeSut = () => new RedecardPaymentAdapter();

const makeFakePaymentData = () => ({
  orderPrice: 10,
  orderReference: Math.floor(Math.random() * 10001),
  cardNumber: '5448280000000007',
  cvv: '235',
  expirationMonth: '12',
  expirationYear: '2020',
  cardHolderName: 'Fulano de Tal',
});

describe('RedecardPaymentAdapter', () => {
  it('must call the pay method with correct data', async () => {
    const sut = makeSut();
    const paySpy = jest
      .spyOn(sut, 'pay')
      .mockReturnValueOnce(new Promise((resolve) => resolve('transaction_id')));
    const fakePaymentData = makeFakePaymentData();
    await sut.pay(fakePaymentData);
    expect(paySpy).toHaveBeenCalledWith(fakePaymentData);
  });

  it('must throw an error if pay method throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(sut, 'pay')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const fakePaymentData = makeFakePaymentData();
    await expect(sut.pay(fakePaymentData)).rejects.toThrow();
  });
});
