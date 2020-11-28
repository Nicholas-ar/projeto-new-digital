import { UsersMongoRespository } from '../../../application/database/mongodb';
import { JwtAdapter } from '../../../application/services/adapters/token/jwt-adapter';
import { LoadAccountByToken } from '../../../application/services/authentication/load-account-by-token';
import { AuthenticationMiddleware } from '../authentication-middleware';

/**
 * Factory method for the authentication middleware
 * @param {Boolean} role
 * @return {AuthenticationMiddleware}
 */
export const makeAuthenticationMiddleware = (role) => {
  const decrypter = new JwtAdapter();
  const userRepository = new UsersMongoRespository();
  const loadAccountByToken = new LoadAccountByToken(decrypter, userRepository);
  return new AuthenticationMiddleware(loadAccountByToken, role);
};
