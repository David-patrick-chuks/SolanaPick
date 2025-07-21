![SolanaPick Banner](./solana-pick-banner.jpg)

# SolanaPick SDK & Payment Server

[![npm version](https://img.shields.io/npm/v/solanapick?style=flat-square)](https://www.npmjs.com/package/solana-pick)
[![CI](https://github.com/David-patrick-chuks/SolanaPick/actions/workflows/ci.yml/badge.svg)](https://github.com/David-patrick-chuks/SolanaPick/actions)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](./LICENSE)

A professional, open source TypeScript SDK and backend for Solana payments. Combines SolanaPick and web3.js logic for easy money requests, QR generation, and transaction verification. Includes a modern hosted payment page and modular backend.

---

## 🚀 Quick Start (for New Web3 Devs)

1. **Install the SDK:**
   ```bash
   npm install solana-pick
   ```
2. **Import and use the SDK:**
   ```ts
   import {
     generateSolanaPickUrl,
     generateHostedPickUrl,
     generateQrCode,
     generateSerializedTransaction,
     verifyTransaction,
     generateReference,
   } from 'solana-pick';
   
   // Generate a unique reference for each payment
   const reference = generateReference();
   
   // Your recipient address (Solana public key)
   const recipient = '...';
   const amount = 0.005;
   const label = 'My Store';
   const message = 'Payment for goods';
   const memo = 'Thank you!';
   
   // Generate a SolanaPick URL
   const url = generateSolanaPickUrl({ recipient, amount, reference, label, message, memo });
   
   // Generate a QR code for the URL
   const qr = await generateQrCode(url);
   
   // Generate a hosted payment page URL (uses your backend URL from env)
   const hostedUrl = generateHostedPickUrl({ recipient, amount, reference, label, message, memo });
   
   // Generate a serialized transaction (for wallets)
   const serializedTx = await generateSerializedTransaction({
     recipient,
     amount,
     payerPublicKey: recipient, // For demo only
     // connectionUrl: 'https://api.devnet.solana.com' // Optional, defaults to mainnet-beta
   });
   
   // Verify a payment on-chain
   const verified = await verifyTransaction({
     reference,
     recipient,
     amount,
     // connectionUrl: 'https://api.devnet.solana.com' // Optional, defaults to mainnet-beta
   });
   ```

---

## 📦 SDK Function Reference & Options

### `generateReference()`
- **Returns:** A new, unique Solana public key (string) to use as a reference for tracking payments.
- **Usage:**
  ```ts
  const reference = generateReference();
  ```

### `generateSolanaPickUrl({ recipient, amount, reference, label?, message?, memo? })`
- **recipient**: The Solana address (public key) to receive the payment. *(string, required)*
- **amount**: The amount of SOL to request. *(number or string, required)*
- **reference**: A unique reference for this payment (use `generateReference()`). *(string, required)*
- **label**: (optional) A label for the payment (e.g., store name).
- **message**: (optional) A message for the payer.
- **memo**: (optional) A memo for the transaction.

### `generateHostedPickUrl({ recipient, amount, reference, label?, message?, memo? })`
- **Uses your backend's hosted payment page URL.**
- **Base URL is set via the `HOSTED_PICK_BASE_URL` environment variable.**
  - Defaults to `http://localhost:3000/pick` if not set.
- **All options are the same as `generateSolanaPickUrl` (except no `baseUrl` parameter).**

### `generateQrCode(url)`
- **url**: Any SolanaPick or hosted payment URL. *(string, required)*
- **Returns:** A base64 PNG data URL for use in web/mobile apps.

### `generateSerializedTransaction({ recipient, amount, payerPublicKey, connectionUrl? })`
- **recipient**: The Solana address to receive the payment. *(string, required)*
- **amount**: Amount of SOL. *(number or string, required)*
- **payerPublicKey**: The public key of the payer (who will sign the transaction). *(string, required)*
- **connectionUrl**: (optional) Solana RPC endpoint. Defaults to mainnet-beta.
- **Returns:** A base64-encoded unsigned transaction.

### `verifyTransaction({ reference, recipient, amount, connectionUrl? })`
- **reference**: The unique reference for the payment. *(string, required)*
- **recipient**: The Solana address that should have received the payment. *(string, required)*
- **amount**: Amount of SOL. *(number or string, required)*
- **connectionUrl**: (optional) Solana RPC endpoint. Defaults to mainnet-beta.
- **Returns:** Transaction info if found, or `null` if not found.

---

## 🗝️ Glossary

| Option     | What is it?                | Example Value                                      | Purpose                                  |
|------------|---------------------------|----------------------------------------------------|------------------------------------------|
| recipient  | Solana address to receive | 2hQYiwpBvy2DmgCwzcs6nx7rGGzetjETEGGaRaUVh4mG       | Who gets the payment                     |
| reference  | Unique tag (public key)   | 3n4uQw1k2v9y8z7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2h1g   | Track/verify this specific payment       |
| label      | Payment label             | My Store                                          | Displayed to the payer                   |
| message    | Payment message           | Payment for goods                                 | Displayed to the payer                   |
| memo       | Transaction memo          | Thank you!                                        | On-chain memo for the payment            |

---

## Project Structure

```
SolanaPick/
├── src/
│   ├── sdk/                # SDK logic (pure, reusable)
│   ├── types/              # Shared types/interfaces
│   ├── server/             # Backend (Express app)
│   │   └── routes/         # Modular route handlers
│   └── index.ts            # SDK entry point
├── examples/               # Usage demos
├── test/                   # All tests (unit, integration)
├── public/                 # Static assets (payment page, etc.)
│   └── pay.html            # Hosted payment page
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── package.json
├── tsconfig.json
├── README.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, coding standards, and PR process.

## License

MIT
