import request from 'jest';
import server from '../../../../application/api/app';

it('returns a 200 status code with a presigned url', async () => {
  const response = await request(server)
    .get('/get_presigned_url')
    .send({ fileName: 'my-test-file.jpg' });
  expect(response.status).toEqual(201);
  expect(response.body).toHaveProperty('urls');
});

it('returns a 400 status code when no filename is provided', async () => {
  const response = await request(server).get('/get_presigned_url').send({});
  expect(response.status).toEqual(400);
});
