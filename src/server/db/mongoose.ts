import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/solanapick';

export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'solanapick',
    });
    console.log('MongoDB connected');
  }
}

export { mongoose }; 