/**
 * Payment Verification API Route
 * -----------------------------
 * Express.js route for verifying Solana payments via the /api/payment/verify endpoint.
 *
 * - Validates query parameters using Zod.
 * - Calls verifyTransaction with retry logic.
 * - Returns JSON status and signature if verified.
 *
 * Example usage:
 *   GET /api/payment/verify?reference=...&recipient=...&amount=...
 *
 * Best practice: Use withRetry to handle transient RPC errors.
 */
import BigNumber from 'bignumber.js';
import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { withRetry } from '../../sdk/utils';
import { verifyTransaction } from '../../sdk/verify';
import { VerifyTransactionOptions } from '../../types/shared';
import { config } from '../config';

const quicknodeEndpoint = config.quicknodeUrl;

export const paymentVerifyRouter = Router();

const VerifyQuerySchema = z.object({
  reference: z.string().min(32),
  recipient: z.string().min(32),
  amount: z.union([z.string(), z.number()]),
});

/**
 * GET /api/payment/verify
 *
 * Query params:
 *   - reference: string (required)
 *   - recipient: string (required)
 *   - amount: string | number (required)
 *
 * @returns {Object} JSON with status and signature if verified, or not found.
 * @throws {400} If input is invalid.
 *
 * Example:
 *   GET /api/payment/verify?reference=...&recipient=...&amount=...
 */
paymentVerifyRouter.get('/', async (req: Request, res: Response) => {
  const parse = VerifyQuerySchema.safeParse(req.query);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid input', details: parse.error.issues });
  }
  const { reference, recipient, amount } = parse.data;
  const result = await withRetry(() => verifyTransaction({
    reference,
    recipient,
    amount: new BigNumber(amount),
    connectionUrl: quicknodeEndpoint,
  } as VerifyTransactionOptions), 3);
  if (result) {
    return res.json({ status: 'verified', signature: result.signature });
  } else {
    return res.json({ status: 'not found' });
  }
});
