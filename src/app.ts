import express from 'express';
import { initMcpServer } from './mcp/index';
import session from 'express-session';
import Logger from './utils/logger';
import dotenv from 'dotenv';
import cors from 'cors';

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


initMcpServer(app);

app.get('/api/status', (req, res) => {
  res.send('up and running');
});

app.get('/', (req, res) => {
  res.send('Data MCP');
});

export default app; 