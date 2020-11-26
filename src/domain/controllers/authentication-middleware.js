import { HTTP_FORBIDDEN_403 } from "../helpers/http-helper";

export class AuthenticationMiddleware {
  async execute(httpRequest) {
    return new Promise((resolve) => resolve(HTTP_FORBIDDEN_403()));
  }
}
