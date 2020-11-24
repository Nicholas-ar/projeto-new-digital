import { SignInController } from '../index';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';
import { UsersMongoRespository } from '../../../application/database/mongodb';
import { Argon2Adapter } from '../../../application/services/adapters/argon2-adapter';
import { JwtAdapter } from '../../../application/services/adapters/jwt-adapter';
import { makeSignInUpValidatorComposite } from './sign-in-up-validator-factory';

/**
 * Factory for the SignIpController.
 * Instantiates all required dependencies and injects it into the SignInController object.
 * @returns {SignInController} - SignIn controller object
 */
export const makeSignInController = () => {
  const validatorComposite = makeSignInUpValidatorComposite();
  const repository = new UsersMongoRespository();
  const hasherService = new Argon2Adapter();
  const tokenGeneratorService = new JwtAdapter();
  const authentication = new DatabaseUserAuthentication(
    repository,
    hasherService,
    tokenGeneratorService
  );

  return new SignInController(validatorComposite, authentication);
};
