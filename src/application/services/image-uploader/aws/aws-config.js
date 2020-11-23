import AWS from 'aws-sdk';

require('dotenv').config();

// TODO: Pass these env variables to a single file that will require the dotenv.config
/**
 * Sets up the AWS S3 access.
 */
export const s3Config = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_TOKEN,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/**
 * Sets up AWS presigned URL parameters.
 * @param {String} fileName 
 */
export const awsSignedUrlPromise = (fileName) => ({
  Bucket: process.env.AWS_BUCKET,
  Key: `${fileName}.jpg`,
  Expires: 60 * 60,
  ACL: 'bucket-owner-full-control',
});
