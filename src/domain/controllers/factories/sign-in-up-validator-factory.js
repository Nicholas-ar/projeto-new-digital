import { EmailValidator } from '../../../application/services/validators/email-validator';
import { RequiredFieldValidator } from '../../../application/services/validators/required-field-validator';
import { ValidatorServiceComposite } from '../../../application/services/validators/validator-composite';
import { ValidatorEmailAdapter } from '../../../application/services/adapters/validator-email-adapter';

/**
 * Factory for the SignUp and SignIn validator composite
 * @returns {ValidatorServiceComposite}
 */
export const makeSignInUpValidatorComposite = () => {
  const emailValidator = new EmailValidator(new ValidatorEmailAdapter());
  const passwordRequiredFieldValidator = new RequiredFieldValidator('password');
  const emailRequiredFieldValidator = new RequiredFieldValidator('password');
  const validatorComposite = new ValidatorServiceComposite([
    emailValidator,
    emailRequiredFieldValidator,
    passwordRequiredFieldValidator,
  ]);
  return validatorComposite;
};
