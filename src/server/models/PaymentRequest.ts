import { Document, Schema, model } from 'mongoose';

export interface IPaymentRequest extends Document {
  reference: string;
  recipient: string;
  amount: string;
  label?: string;
  message?: string;
  memo?: string;
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