import AWS from 'aws-sdk';
import env from '../../../config/environment';

/**
 * Sets up the AWS S3 access.
 */
export const s3Config = new AWS.S3({
  signatureVersion: 'v4',
  region: env.AWS_REGION,
  accessKeyId: env.AWS_TOKEN,
  secretAccessKey: env.AWS_SECRET_KEY,
});

/**
 * Sets up AWS presigned URL parameters.
 * @param {String} fileName
 */
export const awsSignedUrlPromise = (fileName) => ({
  Bucket: env.AWS_BUCKET,
  Key: `${fileName}.jpg`,
  Expires: 60 * 60,
  ACL: 'bucket-owner-full-control',
});
