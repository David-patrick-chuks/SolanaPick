import cors from 'cors';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { startCron } from './cron/expirePayments';
import { connectDB } from './db/mongoose';
import { errorHandler } from './middleware/errorHandler';
import { paymentRequestRouter } from './routes/paymentRequest';
import { paymentVerifyRouter } from './routes/paymentVerify';
import { webhookRouter } from './routes/webhook';

/**
 * Solana-Pick Backend Server
 * -------------------------
 * Express.js application entry point for the Solana-Pick backend.
 *
 * - Handles API routes for payment requests, verification, and webhooks.
 * - Serves static assets and hosted payment page.
 * - Centralizes error handling and rate limiting.
 *
 * Example usage:
 *   npm run dev
 *   # or
 *   npm start
 *
 * Best practice: All configuration should be imported from ./config.
 */
// ENV VARS: MONGODB_URI (MongoDB connection), RATE_LIMIT_WINDOW (ms), RATE_LIMIT_MAX (reqs)
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 min default
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // 100 reqs per window per IP
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

connectDB();
startCron(); // TTL index + cron for reliable expiry

app.use('/api/payment/verify', paymentVerifyRouter);
app.use('/api/payment/request', paymentRequestRouter);
// Webhook endpoint for payment notifications (stub for future integrations)
app.use('/api/webhook', webhookRouter);

// Serve static files (including pay.html) from public/
app.use(express.static(path.resolve(__dirname, '../../public')));

// Serve pay.html at /pay/:reference
app.get('/pay/:reference', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../public/pay.html'));
});

// Serve pay.html at /pick
app.get('/pick', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/pay.html'));
});

// Centralized error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Solana-Pick backend running on port ${PORT}`);
});
