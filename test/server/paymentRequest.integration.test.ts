jest.setTimeout(20000);
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/server/appForTest';
import { connectDB } from '../../src/server/db/mongoose';
import { clearPaymentRequests } from '../utils/testHelpers';

describe('Payment Request API', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await clearPaymentRequests();
    await mongoose.connection.close();
  });

  let reference = '';

  it('should create a payment request', async () => {
    const res = await request(app)
      .post('/api/payment/request')
      .send({ recipient: '11111111111111111111111111111111', amount: 0.01 });
    expect(res.status).toBe(201);
    expect(res.body.reference).toBeDefined();
    reference = res.body.reference;
  });

  it('should fetch the created payment request', async () => {
    const res = await request(app).get(`/api/payment/request/${reference}`);
    expect(res.status).toBe(200);
    expect(res.body.recipient).toBe('11111111111111111111111111111111');
  });

  it('should return not found for invalid reference', async () => {
    const res = await request(app).get('/api/payment/request/invalidref');
    expect(res.status).toBe(404);
  });
});
