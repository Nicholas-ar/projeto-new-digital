import express from 'express';
import { authenticationRoutes, orderRoutes, productRoutes } from './routes';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './swagger';
import { noCache } from './middlewares/no-cache';
import { cors } from './middlewares/cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

app.use('/api-docs', noCache, serve, setup(swaggerConfig));
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', authenticationRoutes);

export default app;
