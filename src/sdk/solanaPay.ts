import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { HostedPaymentUrlOptions, SolanaPayUrlOptions } from '../types/shared';

/**
 * Generate a Solana Pay URL for wallet payments.
 * @param options - SolanaPayUrlOptions
 * @returns Solana Pay URL string
 */
export function generateSolanaPayUrl(options: SolanaPayUrlOptions): string {
  const {
    recipient,
    amount,
    reference,
    label,
    message,
    memo
  } = options;
  const recipientKey = typeof recipient === 'string' ? new PublicKey(recipient) : recipient;
  const baseUrl = `solana:${recipientKey.toBase58()}`;
  const params = new URLSearchParams();
  if (amount) params.append('amount', new BigNumber(amount).toString());
  if (reference) {
    const refKey = typeof reference === 'string' ? new PublicKey(reference) : reference;
    params.append('reference', refKey.toBase58());
  }
  if (label) params.append('label', encodeURIComponent(label));
  if (message) params.append('message', encodeURIComponent(message));
  if (memo) params.append('memo', encodeURIComponent(memo));
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate a hosted payment page URL for browser-based payments.
 * @param options - HostedPaymentUrlOptions
 * @returns Hosted payment page URL string
 */
export function generateHostedPaymentUrl(options: HostedPaymentUrlOptions): string {
  const {
    baseUrl,
    recipient,
    amount,
    reference,
    label,
    message,
    memo
  } = options;
  const params = new URLSearchParams();
  if (recipient) {
    const recipientKey = typeof recipient === 'string' ? recipient : recipient.toBase58();
    params.append('recipient', recipientKey);
  }
  if (amount) params.append('amount', new BigNumber(amount).toString());
  if (reference) {
    const refKey = typeof reference === 'string' ? reference : reference.toBase58();
    params.append('reference', refKey);
  }
  if (label) params.append('label', label);
  if (message) params.append('message', message);
  if (memo) params.append('memo', memo);
  return `${baseUrl}?${params.toString()}`;
} 