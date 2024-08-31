import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { config, corsOptions } from './config';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
});
const { port } = config;
const app = express();

app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
