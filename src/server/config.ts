import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/solana-pick',
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  port: process.env.PORT || 5000,
};
