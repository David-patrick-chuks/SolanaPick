import { Router } from 'express';
import { PaymentRequest } from '../models/PaymentRequest';

export const webhookRouter = Router();

// POST /api/webhook/payment
webhookRouter.post('/payment', async (req, res) => {
  const { event, data } = req.body;
  if (event === 'payment_confirmed' && data && data.reference) {
    try {
      const updated = await PaymentRequest.findOneAndUpdate(
        { reference: data.reference },
        { paid: true, paidAt: new Date() },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Payment request not found' });
      }
      return res.status(200).json({ updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update payment request', details: err.message });
    }
  }
  // In production, verify event/data and process accordingly
  console.log('Received webhook event:', event, data);
  res.status(200).json({ received: true });
}); 