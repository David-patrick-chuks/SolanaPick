import { Document, Schema, model } from 'mongoose';
import { SolanaPickUrlOptions } from '../../types/shared';

// IPaymentRequest extends SolanaPickUrlOptions with backend-specific fields
export interface IPaymentRequest extends SolanaPickUrlOptions, Document {
  reference: string;
  createdAt: Date;
  paid: boolean;
  paidAt?: Date;
}

const PaymentRequestSchema = new Schema<IPaymentRequest>({
  reference: { type: String, required: true, unique: true },
  recipient: { type: String, required: true },
  amount: { type: String, required: true },
  label: String,
  message: String,
  memo: String,
  createdAt: { type: Date, default: Date.now, index: { expires: 1800 } }, // 30 min TTL
  paid: { type: Boolean, default: false },
  paidAt: Date,
});

export const PaymentRequest = model<IPaymentRequest>('PaymentRequest', PaymentRequestSchema);
