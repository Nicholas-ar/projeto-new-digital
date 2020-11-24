import {
  EmailValidator,
  RequiredFieldValidator,
  ValidatorServiceComposite,
} from '../../../application/services/validators';

import { ValidatorEmailAdapter } from '../../../application/services/adapters/validator-email-adapter';

/**
 * Factory for the SignUp and SignIn validator composite
 * @returns {ValidatorServiceComposite}
 */
export const makeSignInUpValidatorComposite = () => {
  const emailValidator = new EmailValidator(new ValidatorEmailAdapter());
  const passwordRequiredFieldValidator = new RequiredFieldValidator('password');
  const emailRequiredFieldValidator = new RequiredFieldValidator('email');
  const validatorComposite = new ValidatorServiceComposite([
    emailValidator,
    emailRequiredFieldValidator,
    passwordRequiredFieldValidator,
  ]);
  return validatorComposite;
};
