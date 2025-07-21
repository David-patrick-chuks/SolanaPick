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

function isValidBase58Address(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

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

  let recipientStr = typeof recipient === 'string' ? recipient.trim() : recipient;
  let payerStr = typeof payerPublicKey === 'string' ? payerPublicKey.trim() : payerPublicKey;

  if (typeof recipientStr === 'string' && !isValidBase58Address(recipientStr)) {
    throw new Error(`Invalid recipient address: '${recipientStr}' is not a valid base58 Solana public key.`);
  }
  if (typeof payerStr === 'string' && !isValidBase58Address(payerStr)) {
    throw new Error(`Invalid payerPublicKey: '${payerStr}' is not a valid base58 Solana public key.`);
  }

  const connection = new Connection(connectionUrl || DEFAULT_CONNECTION_URL, 'confirmed');
  const recipientKey = typeof recipientStr === 'string' ? new PublicKey(recipientStr) : recipientStr;
  const payerKey = typeof payerStr === 'string' ? new PublicKey(payerStr) : payerStr;
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
