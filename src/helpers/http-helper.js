export const HTTP_BAD_REQUEST_400 = (error) => ({
  statusCode: 400,
  body: error,
});

export const HTTP_OK_200 = (data) => ({
  statusCode: 200,
  body: data,
});
