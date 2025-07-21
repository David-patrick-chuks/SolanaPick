import { Router } from 'express';
import { Keypair } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { z } from 'zod';
import { SolanaPayUrlOptions } from '../../types/shared';
import { PaymentRequest } from '../models/PaymentRequest';

export const paymentRequestRouter = Router();

const PaymentRequestSchema = z.object({
  recipient: z.string().min(32),
  amount: z.union([z.string(), z.number()]),
  label: z.string().optional(),
  message: z.string().optional(),
  memo: z.string().optional(),
});

// POST /api/payment/request
paymentRequestRouter.post('/', async (req, res) => {
  const parse = PaymentRequestSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid input', details: parse.error.errors });
  }
  const { recipient, amount, label, message, memo } = parse.data;
  const reference = new Keypair().publicKey.toBase58();
  try {
    const paymentRequest = await PaymentRequest.create({
      reference,
      recipient,
      amount: new BigNumber(amount).toString(),
      label,
      message,
      memo,
      createdAt: new Date(),
      paid: false,
    });
    res.status(201).json(paymentRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment request', details: err.message });
  }
});

// GET /api/payment/request/:reference
paymentRequestRouter.get('/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    const paymentRequest = await PaymentRequest.findOne({ reference });
    if (!paymentRequest) {
      return res.status(404).json({ error: 'Payment request not found' });
    }
    res.json(paymentRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment request', details: err.message });
  }
}); 