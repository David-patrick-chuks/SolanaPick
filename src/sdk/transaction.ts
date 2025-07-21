import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { GenerateTransactionOptions } from '../types/shared';

const DEFAULT_CONNECTION_URL = 'https://api.mainnet-beta.solana.com';

/**
 * Generate a base64-encoded serialized Solana transaction for a payment.
 * The transaction is unsigned and ready for the payer's wallet to sign.
 * @param options - GenerateTransactionOptions
 * @returns Promise<string> - base64 serialized transaction
 */
export async function generateSerializedTransaction(
  options: GenerateTransactionOptions,
): Promise<string> {
  const { recipient, amount, payerPublicKey, connectionUrl } = options;
  const connection = new Connection(connectionUrl || DEFAULT_CONNECTION_URL, 'confirmed');
  const recipientKey = typeof recipient === 'string' ? new PublicKey(recipient) : recipient;
  const payerKey =
    typeof payerPublicKey === 'string' ? new PublicKey(payerPublicKey) : payerPublicKey;
  const lamports = new BigNumber(amount).times(LAMPORTS_PER_SOL).toNumber();

  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: payerKey,
      toPubkey: recipientKey,
      lamports,
    }),
  );

  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  transaction.feePayer = payerKey;

  const serializedTransaction = transaction.serialize({ requireAllSignatures: false });
  return serializedTransaction.toString('base64');
}
