# SolanaPick SDK & Payment Server

[![npm version](https://img.shields.io/npm/v/solanapick?style=flat-square)](https://www.npmjs.com/package/solanapick)
[![CI](https://github.com/yourusername/SolanaPick/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/SolanaPick/actions)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](./LICENSE)

A professional, open source TypeScript SDK and backend for Solana payments. Combines Solana Pay and web3.js logic for easy money requests, QR generation, and transaction verification. Includes a modern hosted payment page and modular backend.

## Features
- Generate Solana Pay URLs
- Create payment QR codes
- Serialize Solana transactions for wallets
- Verify payment completion on-chain
- Hosted payment page (like Paystack/Flutterwave)
- Modular, testable backend
- MongoDB storage with auto-expiry
- Rate limiting, logging, and robust error handling
- Professional code quality and open source standards

## Installation (SDK)

```bash
npm install solanapick
```

## Usage (SDK)

```ts
import {
  generateSolanaPayUrl,
  generateHostedPaymentUrl,
  generateQrCode,
  generateSerializedTransaction,
  verifyTransaction,
} from 'solanapick';

const url = generateSolanaPayUrl({
  recipient: '...',
  amount: 0.005,
  reference: '...',
  label: 'Open Source Store',
  message: 'Payment for Open Source Service',
  memo: 'Thank you!'
});

const qr = await generateQrCode(url);

const serializedTx = await generateSerializedTransaction({
  recipient: '...',
  amount: 0.005,
  payerPublicKey: '...',
  connectionUrl: 'https://api.mainnet-beta.solana.com'
});

const verified = await verifyTransaction({
  reference: '...',
  recipient: '...',
  amount: 0.005,
  connectionUrl: 'https://api.mainnet-beta.solana.com'
});
```

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

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, coding standards, and PR process.

## License
MIT 