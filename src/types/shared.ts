import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

/**
 * Options for generating a Solana Pay URL.
 */
export interface SolanaPayUrlOptions {
  recipient: PublicKey | string;
  amount?: BigNumber | number | string;
  reference?: PublicKey | string;
  label?: string;
  message?: string;
  memo?: string;
}

/**
 * Options for generating a hosted payment page URL.
 */
export interface HostedPaymentUrlOptions extends SolanaPayUrlOptions {
  baseUrl: string;
}

/**
 * Options for generating a serialized transaction.
 */
export interface GenerateTransactionOptions {
  recipient: PublicKey | string;
  amount: BigNumber | number | string;
  payerPublicKey: PublicKey | string;
  connectionUrl: string;
}

/**
 * Options for verifying a transaction on-chain.
 */
export interface VerifyTransactionOptions {
  reference: PublicKey | string;
  recipient: PublicKey | string;
  amount: BigNumber | number | string;
  connectionUrl: string;
} 