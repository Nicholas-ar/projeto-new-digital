import AWS from 'aws-sdk';

require('dotenv').config();

/** Sets up the AWS S3 access. */
export const s3Config = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_TOKEN,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/** Sets up AWS presigned URL parameters. */
export function awsPresignedParametersConfig(fileName) {
  return {
    Bucket: process.env.AWS_BUCKET,
    Key: `qrobuy/${fileName}`,
    Expires: 60 * 60,
    ACL: 'bucket-owner-full-control',
  };
}
