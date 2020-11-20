import { SignInController } from '../signin-controller';
import { ValidatorComposite } from '../../../application/services/validators/validator-composite';
import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { DatabaseUserAuthentication } from '../../../application/services/authentication/database-user-authentication';


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

  const databaseUserAuthentication = new DatabaseUserAuthentication();

  return new SignInController(validatorComposite, databaseUserAuthentication);
};
