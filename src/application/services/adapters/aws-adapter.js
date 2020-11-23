import {
  awsPresignedParametersConfig,
  s3Config,
} from '../image-uploader/aws/aws-config';

/**
 * Controller for the AWS routes.
 * @property {method} execute Method used to fetch a presigned URL.
 */
export class AWSPresignedAdapter {
  /**
   * @param {String} imageName
   */
  async execute(imageName) {
    const awsPresignedParameters = awsPresignedParametersConfig(imageName);
    const s3 = s3Config;
    s3.getSignedUrl('putObject', awsPresignedParameters, (err, url) => {
      if (err) {
        throw new Error('There was an error');
      } else {
          console.log(url)
        return url;
      }
    });
  }
}
