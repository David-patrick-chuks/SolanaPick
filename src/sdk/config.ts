/**
 * SDK Configuration Loader
 * ------------------------
 * Centralizes environment variable access for the SolanaPick SDK.
 *
 * - Loads QuickNode and hosted pick base URLs for use throughout the SDK.
 * - Ensures all SDK modules use consistent configuration.
 * - Loads environment variables via dotenv (called once here).
 *
 * Example usage:
 *   import { sdkConfig } from './config';
 *   const url = sdkConfig.quicknodeUrl;
 *
 * Best practice: Only import config from this file, never use process.env directly in SDK modules.
 */
import dotenv from 'dotenv';
dotenv.config();

/**
 * SDK configuration object.
 * @property {string} quicknodeUrl - The default Solana RPC endpoint for all SDK network calls.
 * @property {string} hostedPickBaseUrl - The base URL for hosted payment pages.
 */
export const sdkConfig = {
  /**
   * The default Solana RPC endpoint for all SDK network calls.
   * Set via QUICKNODE_URL in your environment, or defaults to mainnet-beta.
   */
  quicknodeUrl: process.env.QUICKNODE_URL || 'https://api.mainnet-beta.solana.com',
  /**
   * The base URL for hosted payment pages.
   * Set via HOSTED_PICK_BASE_URL in your environment, or defaults to localhost.
   */
  hostedPickBaseUrl: process.env.HOSTED_PICK_BASE_URL || 'http://localhost:3000/pick',
}; 