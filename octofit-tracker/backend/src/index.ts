import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { apiBaseUrl, apiPort } from './config/apiUrl';
import './config/database';
import apiRoutes from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    message: 'OctoFit Tracker API is running',
    baseUrl: apiBaseUrl,
    port: apiPort,
  });
});

app.listen(apiPort, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});
