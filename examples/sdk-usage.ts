import {
    generateHostedPickUrl,
    generateQrCode,
    generateReference,
    generateSerializedTransaction,
    generateSolanaPickUrl,
    verifyTransaction,
} from '../src';

async function main(): Promise<void> {
  const recipient = '2hQYiwpBvy2DmgCwzcs6nx7rGGzetjETEGGaRaUVh4mG';
  const amount = 0.005;
  // Use the SDK to generate a unique reference (recommended for every payment request)
  const reference = generateReference();
  const label = 'Open Source Store';
  const message = 'Payment for Open Source Service';
  const memo = 'Thank you!';

  // Generate SolanaPick URL
  const pickUrl = generateSolanaPickUrl({ recipient, amount, reference, label, message, memo });
  console.log('SolanaPick URL:', pickUrl);

  // Generate Hosted Pick URL
  const hostedUrl = generateHostedPickUrl({
    recipient,
    amount,
    reference,
    label,
    message,
    memo,
  });
  console.log('Hosted Pick URL:', hostedUrl);

  // Generate QR Code (data URL)
  const qrDataUrl = await generateQrCode(pickUrl);
  console.log('QR Code Data URL:', qrDataUrl.substring(0, 60) + '...');

  // Generate serialized transaction (uses devnet for testing)
  const serializedTx = await generateSerializedTransaction({
    recipient,
    amount,
    payerPublicKey: recipient, // For demo only
    connectionUrl: 'https://api.devnet.solana.com', // Use devnet to avoid rate limits
  });
  console.log('Serialized Transaction:', serializedTx.substring(0, 60) + '...');

  // Verify transaction (uses devnet for testing)
  const verified = await verifyTransaction({
    reference,
    recipient,
    amount,
    connectionUrl: 'https://api.devnet.solana.com', // Use devnet to avoid rate limits
  });
  console.log('Verified:', verified);
}

main();
