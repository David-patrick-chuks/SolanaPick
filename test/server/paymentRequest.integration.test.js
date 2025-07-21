"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.setTimeout(20000);
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const appForTest_1 = __importDefault(require("../../src/server/appForTest"));
const mongoose_2 = require("../../src/server/db/mongoose");
const testHelpers_1 = require("../utils/testHelpers");
describe('Payment Request API', () => {
    beforeAll(async () => {
        await (0, mongoose_2.connectDB)();
    });
    afterAll(async () => {
        await (0, testHelpers_1.clearPaymentRequests)();
        await mongoose_1.default.connection.close();
    });
    let reference = '';
    it('should create a payment request', async () => {
        const res = await (0, supertest_1.default)(appForTest_1.default)
            .post('/api/payment/request')
            .send({ recipient: '11111111111111111111111111111111', amount: 0.01 });
        expect(res.status).toBe(201);
        expect(res.body.reference).toBeDefined();
        reference = res.body.reference;
    });
    it('should fetch the created payment request', async () => {
        const res = await (0, supertest_1.default)(appForTest_1.default).get(`/api/payment/request/${reference}`);
        expect(res.status).toBe(200);
        expect(res.body.recipient).toBe('11111111111111111111111111111111');
    });
    it('should return not found for invalid reference', async () => {
        const res = await (0, supertest_1.default)(appForTest_1.default).get('/api/payment/request/invalidref');
        expect(res.status).toBe(404);
    });
});
//# sourceMappingURL=paymentRequest.integration.test.js.map