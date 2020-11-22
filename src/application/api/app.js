import express from 'express';
import router from './routes';
import awsRouter from '../../components/aws/routes/routes-aws';
import errorHandler from '../../middlewares/error-handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);
app.use('/api/v1', awsRouter);
app.use(errorHandler);

export default app;
