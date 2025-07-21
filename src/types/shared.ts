import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

/**
 * Options for generating a Solana-Pick URL.
 */
export interface SolanaPickUrlOptions {
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
export interface HostedPaymentUrlOptions extends SolanaPickUrlOptions {
  baseUrl: string;
}

/**
 * Options for generating a serialized transaction.
 * @param connectionUrl Optional. Defaults to mainnet-beta if not provided.
 */
export interface GenerateTransactionOptions {
  recipient: PublicKey | string;
  amount: BigNumber | number | string;
  payerPublicKey: PublicKey | string;
  connectionUrl?: string;
}

/**
 * Options for verifying a transaction on-chain.
 * @param connectionUrl Optional. Defaults to mainnet-beta if not provided.
 */
export interface VerifyTransactionOptions {
  reference: PublicKey | string;
  recipient: PublicKey | string;
  amount: BigNumber | number | string;
  connectionUrl?: string;
}
