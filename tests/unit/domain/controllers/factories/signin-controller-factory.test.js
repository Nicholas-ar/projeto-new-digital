import { SignInController } from '../../../../../src/domain/controllers/signin-controller';
import { makeSignInController } from '../../../../../src/domain/controllers/factories/signin-controller-factory';

describe('makeSignInController', () => {
  it('must return an SignInController with correct injected dependencies', () => {
    const sut = makeSignInController();
    expect(sut).toBeInstanceOf(SignInController);
    // expect(sut._authenticator).toBeInstanceOf(Authenticator);
    // expect(sut._validator).toBeInstanceOf(Validator);
  });
});
