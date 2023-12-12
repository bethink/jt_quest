import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { questRoutes } from './api/quest_api';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'sdfsdf',
  });
});

app.get<{}, MessageResponse>('/auth/twitter', (req, res) => {

  res.json({
    message: 'in login',
  });
});

app.use('/api/v1', api);
app.use('/api/v1/quests', questRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
