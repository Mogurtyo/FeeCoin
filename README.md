# FeeCoin 

This is is the backend of the FeeCoin. Every 10 minutes, the fees that are collected automatically from the dev wallet are sent to the coin holders, 80% of the fees are sent to the TOP 100, while the remaining 20% are sent to the others.

## Features

- Continuously claims creator fees from pump.fun tokens
- Distributes fees to token holders based on their ranking 
- Triggers distributions when market cap reaches threshold 
- Supports both simulation and real transaction modes
- Complete API for integration with frontend applications
- Continuous monitoring with configurable intervals
- Full testing support on Solana devnet

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Solana wallet with private key
- API keys for:
  - SolanaTracker API
  - PumpPortal API
  - Any solana rpc

See `config.example.js` for the complete configuration template.


## Distribution Algorithm

The system uses a sophisticated weighted distribution algorithm:

### Top 100 Holders (80% of distribution)
- Rank 1: Weight 100 (4.55% share)
- Rank 2: Weight 99 (4.50% share)
- Rank 3: Weight 98 (4.45% share)
- ...
- Rank 100: Weight 1 (0.05% share)

### Remaining Holders (20% of distribution)
- Applies the same logic as the previous.
- No minimum share needed

### Developer Wallet
- Reserved minimum amount to cover transaction fees
- Configurable minimum amount

## API Endpoints


### Core Data
- `GET /api/status` - Server status
- `GET /api/market-cap` - Current market cap data
- `GET /api/holders` - Retrieves all holders
- `GET /api/distribution` - Distribution history
- `GET /api/balance` - Wallet balance
- `GET /api/config` - System configuration

### Operations
- `POST /api/set-token` - Set token address
- `POST /api/claim-fees` - Manually claim fees
- `POST /api/check-market-cap` - Check market cap
- `POST /api/check-balance` - Check wallet balance
- `POST /api/trigger-distribution` - Manually trigger distribution
- `POST /api/clear-cache` - Clear cached data



## Testing

### Devnet Testing
1. Set `USE_DEVNET: true` in config.js
2. Set `DEVNET_TOKEN_ADDRESS` to your devnet token
3. Run any command to test on devnet

### Mainnet Testing
1. Set `SIMULATION_MODE: true` in config.js
2. Run `npm test` for comprehensive testing
3. Verify all components work before going live
NOTE: running on simulation will send the top 2 shares to the "FEE_DESTINATION_WALLET", 