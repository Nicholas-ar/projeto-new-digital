import express from 'express';
import { authenticationRoutes, orderRoutes, productRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', authenticationRoutes);

export default app;
