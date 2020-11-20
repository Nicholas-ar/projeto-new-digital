import { SignUpController } from '../signup-controller';
import { UsersMongoRespository } from '../../../application/database/mongodb/users-mongo-repository';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';
import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { ValidatorComposite } from '../../../application/services/validators/validator-composite';
import { Argon2Adapter } from '../../services/argon2-adapter';
import { JwtAdapter } from '../../../application/services/token/jwt-adapter';

/**
 * Factory for the SignUpController.
 * Instantiates all required dependencies and injects it into the OrderController object.
 * @returns {SignUpController} - SignUp Controller object
 */
export const makeSignUpController = () => {
  
  const repository = new UsersMongoRespository();
  const hasherService = new Argon2Adapter();
  const tokenGeneratorService = new JwtAdapter(process.env.JWT_SECRET);
  const authentication = new DatabaseUserAuthentication(
    repository,
    hasherService,
    tokenGeneratorService
  );

  const emailValidator = new EmailValidator();
  const requiredFieldValidator = new RequiredFieldValidator();
  const validator = new ValidatorComposite([
    requiredFieldValidator,
    emailValidator,
  ]);

  return new SignUpController(
    repository,
    authentication,
    validator,
    hasherService
  );
};
