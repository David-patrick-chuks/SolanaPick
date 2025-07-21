# SolanaPick SDK & Payment Server

A professional, open source TypeScript SDK and backend for Solana payments. Combines Solana Pay and web3.js logic for easy money requests, QR generation, and transaction verification. Includes a modern hosted payment page and modular backend.

## Features
- Generate Solana Pay URLs
- Create payment QR codes
- Serialize Solana transactions for wallets
- Verify payment completion on-chain
- Hosted payment page (like Paystack/Flutterwave)
- Modular, testable backend
- Professional code quality and open source standards

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