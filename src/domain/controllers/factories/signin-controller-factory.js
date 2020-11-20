import { SignInController } from '../signin-controller';
import { ValidatorComposite } from '../../../application/services/validators/validator-composite';
import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';
import { UsersMongoRespository } from '../../../application/database/mongodb/users-mongo-repository';
import { Argon2Adapter } from '../../services/argon2-adapter';
import { JwtAdapter } from '../../../application/services/token/jwt-adapter';


/**
 * Factory for the SignIpController.
 * Instantiates all required dependencies and injects it into the SignInController object.
 * @returns {SignInController} - SignIn controller object
 */
export const makeSignInController = () => {
  const emailValidator = new EmailValidator();
  const requiredFieldValidator = new RequiredFieldValidator();
  const validatorComposite = new ValidatorComposite([
    emailValidator,
    requiredFieldValidator,
  ]);

  const repository = new UsersMongoRespository();
  const hasherService = new Argon2Adapter();
  const tokenGeneratorService = new JwtAdapter(process.env.JWT_SECRET);
  const authentication = new DatabaseUserAuthentication(
    repository,
    hasherService,
    tokenGeneratorService
  );

  return new SignInController(validatorComposite, authentication);
};
