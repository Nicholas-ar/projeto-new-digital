import { SignInController } from '../signin-controller';
import { ValidatorComposite } from '../../../application/services/validators/validator-composite';
import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';

export const makeSignInController = () => {
  const emailValidator = new EmailValidator();
  const requiredFieldValidator = new RequiredFieldValidator();
  const validatorComposite = new ValidatorComposite([
    emailValidator,
    requiredFieldValidator,
  ]);

  const databaseUserAuthentication = new DatabaseUserAuthentication();

  return new SignInController(validatorComposite, databaseUserAuthentication);
};