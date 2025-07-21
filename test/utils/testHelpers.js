"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearPaymentRequests = clearPaymentRequests;
const PaymentRequest_1 = require("../../src/server/models/PaymentRequest");
async function clearPaymentRequests() {
    await PaymentRequest_1.PaymentRequest.deleteMany({});
}
//# sourceMappingURL=testHelpers.js.map