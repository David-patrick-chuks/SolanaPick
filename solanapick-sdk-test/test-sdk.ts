import {
  generateHostedPickUrl,
  generateQrCode,
  generateReference,
  generateSerializedTransaction,
  generateSolanaPickUrl,
  verifyTransaction,
} from 'solana-pick';

async function main() {
  try {
    // Generate a unique reference for each payment
    const reference = generateReference();

    // Your recipient address (Solana public key)
    const recipient = 'AgGzNEpC1qwCj8MtEp31BCFdEYgEcMzzoRxvicLuSZBh';
    const amount = 0.00050;
    const label = 'My Store';
    const message = 'Payment for goods';
    const memo = 'Thank you!';

    // Generate a SolanaPick URL
    const url = generateSolanaPickUrl({ recipient, amount, reference, label, message, memo });

    // Generate a QR code for the URL
    // const qr = await generateQrCode(url);

    // // Generate a hosted payment page URL (uses your backend URL from env)
    const hostedUrl = generateHostedPickUrl({ recipient, amount, reference, label, message, memo });

    // // Generate a serialized transaction (for wallets)
    // const serializedTx = await generateSerializedTransaction({
    //   recipient,
    //   amount,
    //   payerPublicKey: recipient, // For demo only
    //   // connectionUrl: 'https://api.devnet.solana.com' // Optional, defaults to mainnet-beta
    // });

    // // Verify a payment on-chain
    // const verified = await verifyTransaction({
    //   reference: '81dH5W8R27jRshjRqaMnwKvndnjFhEPmdssjfLVU62hL',
    //   recipient,
    //   amount,
    //   // connectionUrl: 'https://aged-fittest-sheet.solana-mainnet.quiknode.pro/8b24223c5250bb8e6063b6ddb479a239371c10eb' // Optional, defaults to mainnet-beta
    // });

    // Log results
    console.log('Reference:', reference);
    // console.log('SolanaPick URL:', url);
    console.log('Hosted Pick URL:', hostedUrl);
    // console.log('QR Code Data URL:', qr);
    // console.log('Serialized Transaction:', serializedTx.substring(0, 60) + '...');
    // console.log('Verified:', verified);
  } catch (error) {
    console.error('Error running test-sdk.ts:', error);
  }
}

main(); 