import BadRequestError from '../../domain/errors/bad-request-error';
import {
  awsPresignedParametersConfig,
  s3Config,
} from '../../components/aws/configurations/aws-config';

/**
 * Controller for the AWS routes.
 * @property {method} getPresignedUrl Method used to fetch a presigned URL.
 */
class AWSController {
  static async getPresignedUrl(req, res, next) {
    const fileurls = [];
    const { fileName } = req.body;
    try {
      /*if (!fileName) {
        throw new BadRequestError('File name not defined.');
      }*/
      const awsPresignedParameters = awsPresignedParametersConfig(fileName);
      const s3 = s3Config;
      s3.getSignedUrl('putObject', awsPresignedParameters, (err, url) => {
        if (err) {
          throw new BadRequestError('Hmm theres an error.');
        } else {
          fileurls.push(url);
          res.status(201).send({
            success: true,
            message: 'AWS SDK S3 Pre-signed urls generated successfully.',
            urls: fileurls,
          });
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AWSController;
