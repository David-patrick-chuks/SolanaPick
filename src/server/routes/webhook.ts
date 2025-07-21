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
      return res.status(200).json({ status: 'confirmed', updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update payment request', details: err.message });
    }
  }
  if (event === 'payment_failed' && data && data.reference) {
    try {
      const updated = await PaymentRequest.findOneAndUpdate(
        { reference: data.reference },
        { paid: false },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Payment request not found' });
      }
      console.log('Payment failed for reference:', data.reference);
      return res.status(200).json({ status: 'failed', updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update payment request', details: err.message });
    }
  }
  if (event === 'payment_expired' && data && data.reference) {
    try {
      const deleted = await PaymentRequest.findOneAndDelete({ reference: data.reference });
      if (!deleted) {
        return res.status(404).json({ error: 'Payment request not found' });
      }
      console.log('Payment expired and deleted for reference:', data.reference);
      return res.status(200).json({ status: 'expired', deleted });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete payment request', details: err.message });
    }
  }
  // In production, verify event/data and process accordingly
  console.log('Received webhook event:', event, data);
  res.status(200).json({ received: true });
}); 