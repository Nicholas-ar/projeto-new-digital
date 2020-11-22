import { Router } from 'express';
import AWSController from '../../../domain/controllers/aws-controller';

const awsRouter = Router();

awsRouter.get('/get_presigned_url', AWSController.getPresignedUrl);

export default awsRouter;
