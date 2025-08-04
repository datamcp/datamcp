import express from 'express';
import { initMcpServer } from './mcp/index';
import session from 'express-session';
import Logger from './utils/logger';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      currentUser?: { id: number };
    }
  }
}

const app = express();

// Request logging
app.use(Logger.requestLogger());

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));


initMcpServer(app);

app.get('/api/status', (req, res) => {
  res.send('up and running');
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

export default app; 