/**
 * SolanaPick SDK Core Functions
 * ----------------------------
 * Provides utilities for:
 *   - Solana Pay URL generation (for wallet deep links and QR codes)
 *   - Hosted payment URL generation (for redirecting to your payment page)
 *   - Reference generation (for unique payment tracking)
 *
 * All functions are pure and do not perform network requests.
 *
 * Example usage:
 *   import { generateSolanaPickUrl, generateHostedPickUrl, generateReference } from 'solana-pick';
 *
 *   const reference = generateReference();
 *   const url = generateSolanaPickUrl({ recipient, amount, reference });
 *   const hostedUrl = generateHostedPickUrl({ recipient, amount, reference });
 */
import { Keypair } from '@solana/web3.js';
import { URLSearchParams } from 'url';
import { sdkConfig } from './config';

/**
 * Generate a Solana Pay-compliant URL for wallet deep links and QR codes.
 *
 * @param {Object} params - URL options
 * @param {string} params.recipient - Solana address to receive payment (base58)
 * @param {string|number} params.amount - Amount of SOL to request
 * @param {string} params.reference - Unique reference for payment tracking
 * @param {string} [params.label] - Optional label for the payment (e.g., store name)
 * @param {string} [params.message] - Optional message for the payer
 * @param {string} [params.memo] - Optional memo for the transaction
 * @returns {string} Solana Pay URL (e.g., solana:recipient?...)
 *
 * @example
 *   const url = generateSolanaPickUrl({
 *     recipient: '...',
 *     amount: 0.01,
 *     reference: '...',
 *     label: 'Store',
 *     message: 'Payment for goods',
 *     memo: 'Thank you!'
 *   });
 *
 * @throws {Error} If required parameters are missing or invalid.
 */
export function generateSolanaPickUrl({
  recipient,
  amount,
  reference,
  label,
  message,
  memo,
}: {
  recipient: string;
  amount: string | number;
  reference: string;
  label?: string;
  message?: string;
  memo?: string;
}): string {
  const params = new URLSearchParams({
    amount: amount.toString(),
    reference,
  });
  if (label) params.append('label', label);
  if (message) params.append('message', message);
  if (memo) params.append('memo', memo);
  const query = params.toString().replace(/\+/g, '%20');
  return `solana:${recipient}?${query}`;
}

/**
 * Generate a hosted payment page URL for redirecting users to your payment UI.
 *
 * @param {Object} params - URL options (same as generateSolanaPickUrl)
 * @returns {string} Hosted payment page URL
 *
 * @example
 *   const hostedUrl = generateHostedPickUrl({ recipient, amount, reference });
 */
export function generateHostedPickUrl({
  recipient,
  amount,
  reference,
  label,
  message,
  memo,
}: {
  recipient: string;
  amount: string | number;
  reference: string;
  label?: string;
  message?: string;
  memo?: string;
}): string {
  const params = new URLSearchParams({
    recipient,
    amount: amount.toString(),
    reference,
  });
  if (label) params.append('label', label);
  if (message) params.append('message', message);
  if (memo) params.append('memo', memo);
  const query = params.toString().replace(/\+/g, '%20');
  return `${sdkConfig.hostedPickBaseUrl}?${query}`;
}

/**
 * Generate a new unique reference (public key) for payment tracking.
 *
 * @returns {string} A new base58-encoded Solana public key
 *
 * @example
 *   const reference = generateReference();
 */
export function generateReference(): string {
  return new Keypair().publicKey.toBase58();
}
