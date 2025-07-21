import { Router } from 'express';
import { verifyTransaction } from '../../sdk/verify';
import BigNumber from 'bignumber.js';
import { z } from 'zod';
import { VerifyTransactionOptions } from '../../types/shared';

const quicknodeEndpoint = process.env.QUICKNODE_ENDPOINT || 'https://api.mainnet-beta.solana.com';

export const paymentVerifyRouter = Router();

const VerifyQuerySchema = z.object({
  reference: z.string().min(32),
  recipient: z.string().min(32),
  amount: z.union([z.string(), z.number()]),
});

// GET /api/payment/verify?reference=...&recipient=...&amount=...
paymentVerifyRouter.get('/', async (req, res) => {
  const parse = VerifyQuerySchema.safeParse(req.query);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid input', details: parse.error.errors });
  }
  const { reference, recipient, amount } = parse.data;
  const result = await verifyTransaction({
    reference,
    recipient,
    amount: new BigNumber(amount),
    connectionUrl: quicknodeEndpoint,
  } as VerifyTransactionOptions);
  if (result) {
    res.json({ status: 'verified', signature: result.signature });
  } else {
    res.json({ status: 'not found' });
  }
}); 