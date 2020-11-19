import { SignUpController } from '../signup-controller';
import { UsersMongoRespository } from '../../../application/database/mongodb/users-mongo-repository';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';
import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { ValidatorComposite } from '../../../application/services/validators/validator-composite';
import { Argon2Adapter } from '../../services/argon2-adapter';

export const makeSignUpController = () => {
  const repository = new UsersMongoRespository();
  const authentication = new DatabaseUserAuthentication();

  const emailValidator = new EmailValidator();
  const requiredFieldValidator = new RequiredFieldValidator();
  const validator = new ValidatorComposite([
    requiredFieldValidator,
    emailValidator,
  ]);

  const hasherService = new Argon2Adapter();

  return new SignUpController(
    repository,
    authentication,
    validator,
    hasherService
  );
};
