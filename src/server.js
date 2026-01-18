import express from 'express';
import dotenv from 'dotenv';
import logger from "./utils/logger.js";
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/', userRoutes, projectRoutes, organizationRoutes);

app.use(errorHandler);

app.listen(port, () =>
{
    logger.info(`Listening on port ${port}`);
});