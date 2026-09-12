import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { initSocket } from './socket/index.js';

const PORT = env.PORT;

const httpServer = http.createServer(app);

// Initialize Socket.io WebSocket Server
initSocket(httpServer);

const server = httpServer.listen(PORT, () => {
  logger.info(`CarbonSphere Backend running in [${env.NODE_ENV}] mode on http://localhost:${PORT}`);
  logger.info(`API Health endpoint: http://localhost:${PORT}${env.API_PREFIX}/health`);
  logger.info(`WebSocket (Socket.IO) listening on ws://localhost:${PORT}`);
});

// Process Level Exception & Rejection Handling
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection detected:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception detected:', error);
  server.close(() => process.exit(1));
});
