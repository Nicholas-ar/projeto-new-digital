/**
 * Receives Req and Res from Express and adapts to our architecture
 * @param {Middleware} middleware
 */

export const expressMiddlewareAdapter = (middleware) => {
  return async (req, res, next) => {
    const httpRequest = { headers: req.headers };
    const httpResponse = await middleware.execute(httpRequest);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
