import { SignUpController } from "../../../../src/application/controllers";
import { makeSignUpController } from "../../../../src/application/controllers/factories/signup-controller-factory";

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
