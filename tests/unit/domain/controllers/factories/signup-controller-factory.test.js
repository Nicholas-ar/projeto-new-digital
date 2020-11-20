import { SignUpController } from '../../../../../src/domain/controllers/signup-controller';
import { makeSignUpController } from '../../../../../src/domain/controllers/factories/signup-controller-factory';

describe('makeSignUnController', () => {
  it('must return an SignUpController with correct injected dependencies', () => {
    const sut = makeSignUpController();
    expect(sut).toBeInstanceOf(SignUpController);
    // expect(sut._repository).toBeInstanceOf(Repository);
    // expect(sut._authenticator).toBeInstanceOf(Authenticator);
    // expect(sut._validator).toBeInstanceOf(Validator);
    // expect(sut._hasherService).toBeInstanceOf(HasherService);
  });
});
