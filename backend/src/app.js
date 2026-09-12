import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { ApiError } from './utils/apiError.js';
import { HTTP_STATUS } from './constants/index.js';

const app = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in development
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body Parsing & Cookie Parser
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Development Logger
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global API Rate Limiter
const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT.WINDOW_MS,
  max: env.RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests from this IP. Please try again later.'
  }
});
app.use('/api', globalLimiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(HTTP_STATUS.OK).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount Auth Module under /api/auth directly (matching specification)
app.use('/api/auth', authRoutes);

// Mount Master Module Router under /api/v1
app.use(env.API_PREFIX, apiRouter);

// 404 Handler for Unmatched Routes
app.use((req, res, next) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route '${req.method} ${req.originalUrl}' was not found.`));
});

// Centralized Global Error Middleware
app.use(errorHandler);

export default app;
