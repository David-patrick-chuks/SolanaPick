import { z } from 'zod';

/**
 * Zod schema for SolanaPickUrlOptions (used for payment request validation)
 */
export const solanaPickUrlOptionsSchema = z.object({
  recipient: z.string().min(32),
  amount: z.union([z.string(), z.number()]),
  reference: z.string().optional(),
  label: z.string().optional(),
  message: z.string().optional(),
  memo: z.string().optional(),
});
