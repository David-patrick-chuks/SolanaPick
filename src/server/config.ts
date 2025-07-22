/**
 * Server Configuration Loader
 * --------------------------
 * Centralizes environment variable access for the Solana-Pick backend server.
 *
 * - Loads MongoDB URI, rate limiting, port, QuickNode URL, and hosted pick base URL.
 * - Ensures all server modules use consistent configuration.
 * - Loads environment variables via dotenv (called once here).
 *
 * Example usage:
 *   import { config } from './config';
 *   const dbUri = config.mongodbUri;
 *
 * Best practice: Only import config from this file, never use process.env directly in server modules.
 */
import dotenv from 'dotenv';
dotenv.config();

/**
 * Server configuration object.
 * @property {string} mongodbUri - MongoDB connection string.
 * @property {number} rateLimitWindow - Rate limit window in ms.
 * @property {number} rateLimitMax - Max requests per window per IP.
 * @property {string|number} port - Server port.
 * @property {string} quicknodeUrl - Default Solana RPC endpoint.
 * @property {string} hostedPickBaseUrl - Base URL for hosted payment pages.
 */
export const config = {
  /**
   * MongoDB connection string.
   * Set via MONGODB_URI in your environment, or defaults to localhost.
   */
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/solana-pick',
  /**
   * Rate limit window in ms.
   * Set via RATE_LIMIT_WINDOW in your environment, or defaults to 15 minutes.
   */
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  /**
   * Max requests per window per IP.
   * Set via RATE_LIMIT_MAX in your environment, or defaults to 100.
   */
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  /**
   * Server port.
   * Set via PORT in your environment, or defaults to 5000.
   */
  port: process.env.PORT || 5000,
  /**
   * Default Solana RPC endpoint for server-side calls.
   * Set via QUICKNODE_URL in your environment, or defaults to mainnet-beta.
   */
  quicknodeUrl: process.env.QUICKNODE_URL || 'https://api.mainnet-beta.solana.com',
  /**
   * Base URL for hosted payment pages.
   * Set via HOSTED_PICK_BASE_URL in your environment, or defaults to localhost.
   */
  hostedPickBaseUrl: process.env.HOSTED_PICK_BASE_URL || 'http://localhost:3000/pick',
};
