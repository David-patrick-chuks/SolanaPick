import { Keypair } from '@solana/web3.js';
import { URLSearchParams } from 'url';

const HOSTED_PICK_BASE_URL = process.env.HOSTED_PICK_BASE_URL || 'http://localhost:3000/pick';

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
  return `${HOSTED_PICK_BASE_URL}?${query}`;
}

export function generateReference(): string {
  return new Keypair().publicKey.toBase58();
}
