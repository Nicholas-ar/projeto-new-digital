import AWS from 'aws-sdk';
require('dotenv').config();
/**
 * Sets up the AWS S3 access.
 */
export const s3Config = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
