import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import './src/config/database';
import apiRoutes from './src/routes/api';

const port = 8000;

// In Codespaces, expose the API through the forwarded port URL for port 8000.
const codespaceName = process.env.CODESPACE_NAME;

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Outside Codespaces, keep localhost support so the API runs normally in local development.
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    message: 'OctoFit Tracker API is running',
    baseUrl: apiBaseUrl,
    port,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening at ${apiBaseUrl}`);
});
