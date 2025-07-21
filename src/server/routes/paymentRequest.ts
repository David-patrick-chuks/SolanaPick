import { Keypair } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { Request, Response, Router } from 'express';
import { PaymentRequest } from '../models/PaymentRequest';
import { solanaPickUrlOptionsSchema } from '../validation/paymentRequest';

export const paymentRequestRouter = Router();

// POST /api/payment/request
paymentRequestRouter.post('/', async (req: Request, res: Response) => {
  const parse = solanaPickUrlOptionsSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid input', details: parse.error.issues });
  }
  const { recipient, amount, label, message, memo } = parse.data;
  // Always generate a new reference, ignore any provided in body
  const reference = new Keypair().publicKey.toBase58();
  try {
    const paymentRequest = await PaymentRequest.create({
      reference,
      recipient,
      amount: new BigNumber(amount).toString(), // always store as string
      label,
      message,
      memo,
      createdAt: new Date(),
      paid: false,
    });
    return res.status(201).json(paymentRequest);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: 'Failed to create payment request', details: message });
  }
});

// GET /api/payment/request/:reference
paymentRequestRouter.get('/:reference', async (req: Request, res: Response) => {
  const { reference } = req.params;
  try {
    const paymentRequest = await PaymentRequest.findOne({ reference });
    if (!paymentRequest) {
      return res.status(404).json({ error: 'Payment request not found' });
    }
    return res.json(paymentRequest);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: 'Failed to fetch payment request', details: message });
  }
});
