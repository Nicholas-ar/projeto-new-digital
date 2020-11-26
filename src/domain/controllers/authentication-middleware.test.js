import { HTTP_FORBIDDEN_403 } from "../helpers/http-helper";
import { AuthenticationMiddleware } from "./authentication-middleware";

describe('AuthenticationMiddleware', () => {
    it('must return a 403 if no x-access-token exists in headers', async () => {
        const sut = new AuthenticationMiddleware()
        const httpResponse = await sut.execute({})
        expect(httpResponse).toEqual(HTTP_FORBIDDEN_403())
    });
});