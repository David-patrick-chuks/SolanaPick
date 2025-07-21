import { generateHostedPickUrl, generateReference, generateSolanaPickUrl } from '../../src';

describe('SolanaPick SDK', () => {
  it('generates a valid SolanaPick URL', () => {
    const reference = generateReference();
    const url = generateSolanaPickUrl({
      recipient: '11111111111111111111111111111111',
      amount: 0.01,
      reference,
      label: 'Test Store',
      message: 'Test Payment',
      memo: 'Test Memo',
    });
    expect(url).toContain('pick:11111111111111111111111111111111');
    expect(url).toContain('amount=0.01');
    expect(url).toContain('reference=' + reference);
    expect(url).toContain('label=Test%20Store');
    expect(url).toContain('message=Test%20Payment');
    expect(url).toContain('memo=Test%20Memo');
  });

  it('generates a valid hosted pick URL', () => {
    const reference = generateReference();
    const url = generateHostedPickUrl({
      recipient: '11111111111111111111111111111111',
      amount: 0.01,
      reference,
      label: 'Test Store',
      message: 'Test Payment',
      memo: 'Test Memo',
    });
    expect(url).toContain('http://localhost:3000/pick?'); // or use process.env.HOSTED_PICK_BASE_URL if set
    expect(url).toContain('recipient=11111111111111111111111111111111');
    expect(url).toContain('amount=0.01');
    expect(url).toContain('reference=' + reference);
    expect(url).toContain('label=Test%20Store');
    expect(url).toContain('message=Test%20Payment');
    expect(url).toContain('memo=Test%20Memo');
  });
});
