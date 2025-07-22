/**
 * Solana-Pick SDK Entry Point
 * --------------------------
 * This file re-exports all public SDK modules for external consumers.
 *
 * Exports:
 *   - generateQrCode: Generate QR codes for Solana Pay URLs
 *   - generateSolanaPickUrl: Create Solana Pay-compliant payment URLs
 *   - generateHostedPickUrl: Create hosted payment page URLs
 *   - generateReference: Generate unique references for payment tracking
 *   - generateSerializedTransaction: Serialize unsigned Solana transactions
 *   - verifyTransaction: Verify on-chain payments
 *   - withRetry: Retry helper for async operations
 *   - All shared types/interfaces
 *
 * Example usage:
 *   import { generateSolanaPickUrl, generateQrCode } from 'solana-pick';
 *   const url = generateSolanaPickUrl({ ... });
 *   const qr = await generateQrCode(url);
 */
export * from './sdk/qr';
export * from './sdk/solanaPick';
export * from './sdk/transaction';
export * from './sdk/verify';
export * from './types/shared';

