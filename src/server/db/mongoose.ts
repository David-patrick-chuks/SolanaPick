import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/solanapick';

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'solanapick',
    });
    console.log('MongoDB connected');
  }
}

export { mongoose };
