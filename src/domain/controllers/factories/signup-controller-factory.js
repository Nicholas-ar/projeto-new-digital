import { SignUpController } from '../index';
import { UsersMongoRespository } from '../../../application/database/mongodb';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';
import { Argon2Adapter } from '../../../application/services/adapters/argon2-adapter';
import { JwtAdapter } from '../../../application/services/adapters/jwt-adapter';
import { makeSignInUpValidatorComposite } from './sign-in-up-validator-factory';

/**
 * Factory for the SignUpController.
 * Instantiates all required dependencies and injects it into the OrderController object.
 * @returns {SignUpController} - SignUp Controller object
 */
export const makeSignUpController = () => {
  const repository = new UsersMongoRespository();
  const hasherService = new Argon2Adapter();
  const tokenGeneratorService = new JwtAdapter();
  const authenticator = new DatabaseUserAuthentication(
    repository,
    hasherService,
    tokenGeneratorService
  );

  const validatorComposite = makeSignInUpValidatorComposite();

  return new SignUpController(
    repository,
    authenticator,
    validatorComposite,
    hasherService
  );
};
