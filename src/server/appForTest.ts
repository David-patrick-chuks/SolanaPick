import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { paymentRequestRouter } from './routes/paymentRequest';
import { paymentVerifyRouter } from './routes/paymentVerify';
import { webhookRouter } from './routes/webhook';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.use('/api/payment/verify', paymentVerifyRouter);
app.use('/api/payment/request', paymentRequestRouter);
app.use('/api/webhook', webhookRouter);
app.use(express.static(path.resolve(__dirname, '../../public')));
app.get('/pay/:reference', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/pay.html'));
});

export default app;
