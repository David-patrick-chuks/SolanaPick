/**
 * SolanaPick SDK verification utilities:
 * - On-chain payment verification for Solana
 * - Input validation for references and recipients
 */
import {
  Connection,
  LAMPORTS_PER_SOL,
  ParsedInstruction,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { VerifyTransactionOptions } from '../types/shared';
import { sdkConfig } from './config';

/**
 * Validate if a string is a valid base58 Solana public key.
 * @param {string} address - The address to validate.
 * @returns {boolean} True if valid, false otherwise.
 * @example
 *   isValidBase58Address('2hQYiwpBvy2DmgCwzcs6nx7rGGzetjETEGGaRaUVh4mG'); // true
 */
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
 *
 * @param {VerifyTransactionOptions} options - Verification options
 * @returns {Promise<{ signature: string, confirmed: boolean } | null>} Transaction info if found, or null if not found
 *
 * @throws {Error} If reference or recipient is invalid
 *
 * @example
 *   const result = await verifyTransaction({ reference, recipient, amount });
 *   if (result) { ... }
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

  const connection = new Connection(connectionUrl || sdkConfig.quicknodeUrl, 'confirmed');
  const referenceKey = typeof referenceStr === 'string' ? new PublicKey(referenceStr) : referenceStr;
  const recipientKey = typeof recipientStr === 'string' ? new PublicKey(recipientStr) : recipientStr;
  const lamports = new BigNumber(amount).times(LAMPORTS_PER_SOL).toNumber();

  const signatures = await connection.getSignaturesForAddress(recipientKey, { limit: 10 });

  for (const sigInfo of signatures) {
    const signature = sigInfo.signature;
    const transaction = await connection.getParsedTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
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
