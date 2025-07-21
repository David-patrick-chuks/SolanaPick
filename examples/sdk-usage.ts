import {
    generateHostedPaymentUrl,
    generateQrCode,
    generateSerializedTransaction,
    generateSolanaPayUrl,
    verifyTransaction,
} from '../src';

async function main() {
  const recipient = 'YourRecipientAddressHere';
  const amount = 0.005;
  const reference = 'YourReferenceHere';
  const label = 'Open Source Store';
  const message = 'Payment for Open Source Service';
  const memo = 'Thank you!';
  const connectionUrl = 'https://api.mainnet-beta.solana.com';

  // Generate Solana Pay URL
  const payUrl = generateSolanaPayUrl({ recipient, amount, reference, label, message, memo });
  console.log('Solana Pay URL:', payUrl);

  // Generate Hosted Payment URL
  const hostedUrl = generateHostedPaymentUrl({
    baseUrl: 'https://pay.solanapick.com/pay',
    recipient,
    amount,
    reference,
    label,
    message,
    memo,
  });
  console.log('Hosted Payment URL:', hostedUrl);

  // Generate QR Code (data URL)
  const qrDataUrl = await generateQrCode(payUrl);
  console.log('QR Code Data URL:', qrDataUrl.substring(0, 60) + '...');

  // Generate serialized transaction
  const serializedTx = await generateSerializedTransaction({
    recipient,
    amount,
    payerPublicKey: recipient, // For demo only
    connectionUrl,
  });
  console.log('Serialized Transaction:', serializedTx.substring(0, 60) + '...');

  // Verify transaction (will be null unless a real payment exists)
  const verified = await verifyTransaction({
    reference,
    recipient,
    amount,
    connectionUrl,
  });
  console.log('Verified:', verified);
}

main(); 