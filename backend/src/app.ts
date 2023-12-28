import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
// import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { ClientRequest } from 'http';
 import clientRoutes from './api/clientRoutes';
 import questRoutes from './api/questRoutes';
 import questapi from './api/quest_api'
 import sequelize from './models';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());



app.use('/api/v3', questapi);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', questRoutes)


 app.use(middlewares.notFound);
 app.use(middlewares.errorHandler);

export default app;



// app.get<{}, MessageResponse>('/', (req, res) => {
//   res.json({
//     message: 'sdfsdf',
//   });
// });

// app.get<{}, MessageResponse>('/auth/twitter', (req, res) => {

//   res.json({
//     message: 'in login',
//   });
// });