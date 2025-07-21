"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
describe('Solana-Pick SDK', () => {
    it('generates a valid Solana-Pick URL', () => {
        const url = (0, src_1.generateSolanaPickUrl)({
            recipient: '11111111111111111111111111111111',
            amount: 0.01,
            reference: '22222222222222222222222222222222',
            label: 'Test Store',
            message: 'Test Payment',
            memo: 'Test Memo',
        });
        expect(url).toContain('pick:11111111111111111111111111111111');
        expect(url).toContain('amount=0.01');
        expect(url).toContain('reference=22222222222222222222222222222222');
        expect(url).toContain('label=Test%20Store');
        expect(url).toContain('message=Test%20Payment');
        expect(url).toContain('memo=Test%20Memo');
    });
    it('generates a valid hosted pick URL', () => {
        const url = (0, src_1.generateHostedPickUrl)({
            baseUrl: 'https://pick.example.com/pick',
            recipient: '11111111111111111111111111111111',
            amount: 0.01,
            reference: '22222222222222222222222222222222',
            label: 'Test Store',
            message: 'Test Payment',
            memo: 'Test Memo',
        });
        expect(url).toContain('https://pick.example.com/pick?');
        expect(url).toContain('recipient=11111111111111111111111111111111');
        expect(url).toContain('amount=0.01');
        expect(url).toContain('reference=22222222222222222222222222222222');
        expect(url).toContain('label=Test%20Store');
        expect(url).toContain('message=Test%20Payment');
        expect(url).toContain('memo=Test%20Memo');
    });
});
//# sourceMappingURL=solanaPick.test.js.map