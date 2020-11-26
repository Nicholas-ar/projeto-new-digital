import { UsersMongoRespository } from '../../../application/database/mongodb';
import { LoadAccountByToken } from '../../../application/database/mongodb/load-account-by-token';
import { JwtAdapter } from '../../../application/services/adapters/token/jwt-adapter';
import { AuthenticationMiddleware } from '../authentication-middleware';

export const makeAuthenticationMiddleware = (role) => {
  const decrypter = new JwtAdapter();
  const userRepository = new UsersMongoRespository();
  const loadAccountByToken = new LoadAccountByToken(decrypter, userRepository);
  return new AuthenticationMiddleware(loadAccountByToken, role);
};
