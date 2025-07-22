/**
 * MongoDB Connection Utilities
 * ---------------------------
 * Handles connection to MongoDB for the Solana-Pick backend server.
 *
 * Example usage:
 *   import { connectDB } from './db/mongoose';
 *   await connectDB();
 */
import mongoose from 'mongoose';
import { config } from '../config';

const MONGODB_URI = config.mongodbUri;

/**
 * Connect to MongoDB using the provided URI.
 *
 * @returns {Promise<void>} Resolves when connected.
 * @throws {Error} If connection fails.
 *
 * @example
 *   await connectDB();
 */
export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'solana-pick',
    });
    console.log('MongoDB connected');
  }
}

export { mongoose };
