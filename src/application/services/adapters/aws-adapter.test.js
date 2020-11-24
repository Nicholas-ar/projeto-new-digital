import { AWSPresignedAdapter } from './aws-adapter';

const makeSut = () => new AWSPresignedAdapter();

describe('AWSPresignedAdapter', () => {
  it('execute must call awsSignedUrlPromise with correct parameters ', async () => {
    const awsSignedUrlPromiseSpy = jest.fn((fileName) => ({
      Bucket: 'some_bucket',
      Key: `${fileName}.jpg`,
      Expires: 60 * 60,
      ACL: 'some_ACL',
    }));
    const sut = makeSut();
    await sut.execute('some_image_name', awsSignedUrlPromiseSpy);
    expect(awsSignedUrlPromiseSpy).toHaveBeenCalledWith('some_image_name');
  });

  it('execute must return the S3 put url', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'execute').mockResolvedValueOnce('signed_url');
    const result = await sut.execute('some_image_name');
    expect(result).toBe('signed_url');
  });
});
