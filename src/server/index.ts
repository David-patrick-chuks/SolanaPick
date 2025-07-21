import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { startCron } from './cron/expirePayments';
import { connectDB } from './db/mongoose';
import { paymentRequestRouter } from './routes/paymentRequest';
import { paymentVerifyRouter } from './routes/paymentVerify';
import { webhookRouter } from './routes/webhook';

dotenv.config();

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

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SolanaPick backend running on port ${PORT}`);
}); 