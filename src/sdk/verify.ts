import {
    Connection,
    LAMPORTS_PER_SOL,
    ParsedInstruction,
    PublicKey,
    SystemProgram,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { VerifyTransactionOptions } from '../types/shared';

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
 * Verify if a payment transaction has been completed on-chain.
 * @param options - VerifyTransactionOptions
 * @returns Promise<{ signature: string, confirmed: boolean } | null>
 */
export async function verifyTransaction(
  options: VerifyTransactionOptions,
): Promise<{ signature: string; confirmed: boolean } | null> {
  const { reference, recipient, amount, connectionUrl } = options;

  let referenceStr = typeof reference === 'string' ? reference.trim() : reference;
  let recipientStr = typeof recipient === 'string' ? recipient.trim() : recipient;

  if (typeof referenceStr === 'string' && !isValidBase58Address(referenceStr)) {
    throw new Error(`Invalid reference: '${referenceStr}' is not a valid base58 Solana public key.`);
  }
  if (typeof recipientStr === 'string' && !isValidBase58Address(recipientStr)) {
    throw new Error(`Invalid recipient address: '${recipientStr}' is not a valid base58 Solana public key.`);
  }

  const connection = new Connection(connectionUrl || DEFAULT_CONNECTION_URL, 'confirmed');
  const referenceKey = typeof referenceStr === 'string' ? new PublicKey(referenceStr) : referenceStr;
  const recipientKey = typeof recipientStr === 'string' ? new PublicKey(recipientStr) : recipientStr;
  const lamports = new BigNumber(amount).times(LAMPORTS_PER_SOL).toNumber();

  const signatures = await connection.getSignaturesForAddress(recipientKey, { limit: 10 });

  for (const sigInfo of signatures) {
    const signature = sigInfo.signature;
    const transaction = await connection.getParsedTransaction(signature, {
      commitment: 'confirmed',
    });
    if (transaction && transaction.transaction.message.instructions) {
      for (const instruction of transaction.transaction.message.instructions) {
        // Only check parsed instructions
        if ('parsed' in instruction && instruction.programId.equals(SystemProgram.programId)) {
          const parsed = (instruction as ParsedInstruction).parsed;
          if (
            parsed &&
            parsed.type === 'transfer' &&
            parsed.info.destination === recipientKey.toBase58() &&
            parsed.info.lamports === lamports
          ) {
            if (
              transaction.transaction.message.accountKeys.some((key) =>
                key.pubkey.equals(referenceKey),
              )
            ) {
              return { signature, confirmed: true };
            }
          }
        }
      }
    }
  }
  return null;
}
