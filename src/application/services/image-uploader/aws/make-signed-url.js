import env from '../../../config/environment';

/**
 * Sets up AWS presigned URL parameters.
 * @param {String} fileName
 */
export const makeAwsSignedUrlPromise = (fileName) => ({
  Bucket: env.AWS_BUCKET,
  Key: `${fileName}.jpg`,
  Expires: 60 * 60,
  ACL: 'bucket-owner-full-control',
});
