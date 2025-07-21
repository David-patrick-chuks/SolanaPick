import { Connection, LAMPORTS_PER_SOL, ParsedInstruction, PublicKey, SystemProgram } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { VerifyTransactionOptions } from '../types/shared';

/**
 * Verify if a payment transaction has been completed on-chain.
 * @param options - VerifyTransactionOptions
 * @returns Promise<{ signature: string, confirmed: boolean } | null>
 */
export async function verifyTransaction(options: VerifyTransactionOptions): Promise<{ signature: string, confirmed: boolean } | null> {
  const { reference, recipient, amount, connectionUrl } = options;
  const connection = new Connection(connectionUrl, 'confirmed');
  const referenceKey = typeof reference === 'string' ? new PublicKey(reference) : reference;
  const recipientKey = typeof recipient === 'string' ? new PublicKey(recipient) : recipient;
  const lamports = new BigNumber(amount).times(LAMPORTS_PER_SOL).toNumber();

  const signatures = await connection.getSignaturesForAddress(recipientKey, { limit: 10 });

  for (const sigInfo of signatures) {
    const signature = sigInfo.signature;
    const transaction = await connection.getParsedTransaction(signature, { commitment: 'confirmed' });
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
            // Check for reference in transaction keys
            if (transaction.transaction.message.accountKeys.some(key => key.pubkey.equals(referenceKey))) {
              return { signature, confirmed: true };
            }
          }
        }
      }
    }
  }
  return null;
} 