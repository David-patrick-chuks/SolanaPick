import { generateHostedPaymentUrl, generateSolanaPayUrl } from '../../src';

describe('SolanaPay SDK', () => {
  it('generates a valid Solana Pay URL', () => {
    const url = generateSolanaPayUrl({
      recipient: '11111111111111111111111111111111',
      amount: 0.01,
      reference: '22222222222222222222222222222222',
      label: 'Test Store',
      message: 'Test Payment',
      memo: 'Test Memo',
    });
    expect(url).toContain('solana:11111111111111111111111111111111');
    expect(url).toContain('amount=0.01');
    expect(url).toContain('reference=22222222222222222222222222222222');
    expect(url).toContain('label=Test%20Store');
    expect(url).toContain('message=Test%20Payment');
    expect(url).toContain('memo=Test%20Memo');
  });

  it('generates a valid hosted payment URL', () => {
    const url = generateHostedPaymentUrl({
      baseUrl: 'https://pay.example.com/pay',
      recipient: '11111111111111111111111111111111',
      amount: 0.01,
      reference: '22222222222222222222222222222222',
      label: 'Test Store',
      message: 'Test Payment',
      memo: 'Test Memo',
    });
    expect(url).toContain('https://pay.example.com/pay?');
    expect(url).toContain('recipient=11111111111111111111111111111111');
    expect(url).toContain('amount=0.01');
    expect(url).toContain('reference=22222222222222222222222222222222');
    expect(url).toContain('label=Test Store');
    expect(url).toContain('message=Test Payment');
    expect(url).toContain('memo=Test Memo');
  });
}); 