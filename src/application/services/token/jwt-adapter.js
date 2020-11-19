import jwt from 'jsonwebtoken';

export class JwtAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  generate(value) {
    const accessToken = jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
