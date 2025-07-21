import { PaymentRequest } from '../../src/server/models/PaymentRequest';

export async function clearPaymentRequests(): Promise<void> {
  await PaymentRequest.deleteMany({});
}
