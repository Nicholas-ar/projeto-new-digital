import AWS from 'aws-sdk';

require('dotenv').config();

/** Sets up the AWS S3 access. */
export const s3Config = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.REGION,
  accessKeyId: process.env.TOKEN,
  secretAccessKey: process.env.AMAZON_SECRET_KEY,
});

/** Sets up AWS presigned URL parameters. */
export function awsPresignedParametersConfig(fileName) {
  return {
    Bucket: process.env.BUCKET,
    Key: `${fileName}`,
    Expires: 60 * 60,
    ACL: 'bucket-owner-full-control',
  };
}
