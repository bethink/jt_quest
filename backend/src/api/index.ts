import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - sdf',
  });
});

router.get<{}, MessageResponse>('/login', (req, res) => {
  res.json({
    message: 'API sdfsdf',
  });
});

router.use('/emojis', emojis);

export default router;
