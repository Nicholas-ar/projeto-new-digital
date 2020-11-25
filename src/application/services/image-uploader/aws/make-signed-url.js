require('dotenv').config();
/**
 * Sets up AWS presigned URL parameters.
 * @param {String} fileName
 */
export const makeAwsSignedUrlPromise = (fileName) => ({
  Bucket: process.env.AWS_BUCKET,
  Key: `${fileName}.jpg`,
  Expires: 60 * 60,
  ACL: 'bucket-owner-full-control',
});
