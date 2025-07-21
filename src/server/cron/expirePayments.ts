import cron from 'node-cron';
import { PaymentRequest } from '../models/PaymentRequest';

// Run every 10 minutes
export function startCron() {
  cron.schedule('*/10 * * * *', async () => {
    const now = new Date();
    // TTL index will auto-delete, but as a backup, remove any unpaid/expired
    const expired = await PaymentRequest.deleteMany({
      paid: false,
      createdAt: { $lt: new Date(now.getTime() - 30 * 60 * 1000) },
    });
    if (expired.deletedCount) {
      console.log(`Cron: Deleted ${expired.deletedCount} expired payment requests.`);
    }
  });
} 