# FeeCoin Web API Documentation

## Overview
The FeeCoin Web Server provides a REST API for integrating with the existing website. It serves the website files and provides real-time data about token holders, market cap, and distribution information.

## Server Setup

### Start the Web Server
```bash
npm run web
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. **Set Token Address**
**POST** `/api/set-token`

Sets the token address to monitor.

**Request Body:**
```json
{
  "tokenAddress": "9M63s5E8BwVeCqBre6ZWT4kgh3wo9y5ew2A2XNDzpump"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token address set successfully",
  "tokenAddress": "9M63s5E8BwVeCqBre6ZWT4kgh3wo9y5ew2A2XNDzpump"
}
```

### 2. **Get Market Cap Data**
**GET** `/api/market-cap`

Returns current market cap and threshold information.

**Response:**
```json
{
  "marketCap": 119933,
  "threshold": 100000,
  "thresholdReached": true,
  "progress": "119.9",
  "remaining": 0
}
```

### 3. **Get Top Holders**
**GET** `/api/holders`

Returns the top 100 token holders.

**Response:**
```json
{
  "holders": [
    {
      "wallet": "EgsYmiAUGeJh...oUBbi1Se",
      "amount": 1000000,
      "percentage": 5.0,
      "value": {
        "usd": 100.50
      }
    }
  ],
  "total": 100
}
```

### 4. **Get Distribution Preview**
**GET** `/api/distribution`

Returns the weighted distribution preview for all holders.

**Response:**
```json
{
  "distribution": [
    {
      "rank": 1,
      "wallet": "EgsYmiAUGeJh...oUBbi1Se",
      "weight": 100,
      "sharePercentage": 2.55,
      "amount": 0.002550,
      "isDeveloper": false,
      "meetsMinimum": true
    }
  ],
  "statistics": {
    "totalRecipients": 101,
    "totalDistributed": 0.2,
    "violations": 0,
    "allMeetMinimum": true,
    "topHolderAmount": 0.002550,
    "developerAmount": 0.1
  }
}
```

### 5. **Get Wallet Balance**
**GET** `/api/balance`

Returns the current wallet balance.

**Response:**
```json
{
  "balance": 0.2,
  "address": "2EYLqMREVeWhUoRmdu995tfnLCCUXzgKhsdvCA2gVwm2"
}
```

### 6. **Get System Configuration**
**GET** `/api/config`

Returns the current system configuration.

**Response:**
```json
{
  "marketCapThreshold": 100000,
  "distributionInterval": 900000,
  "feeClaimInterval": 30000,
  "minDistributionAmount": 0.1,
  "simulationMode": true,
  "developerWallet": "2EYLqMREVeWhUoRmdu995tfnLCCUXzgKhsdvCA2gVwm2",
  "feeDestinationWallet": "33bM7x6z23BPgwLwA7Yh5rQyBpjFPoFEFRUrxvTEnAfz"
}
```

### 7. **Get Server Status**
**GET** `/api/status`

Returns the current server status.

**Response:**
```json
{
  "status": "running",
  "tokenAddress": "9M63s5E8BwVeCqBre6ZWT4kgh3wo9y5ew2A2XNDzpump",
  "timestamp": "2024-01-15T19:30:00.000Z"
}
```

## Website Integration

The server automatically serves your website files from the `feecoinweb` folder. You can access:

- **Main Website**: `http://localhost:3000`
- **API Base**: `http://localhost:3000/api`

## Frontend Integration Examples

### JavaScript Fetch Examples

```javascript
// Set token address
const setToken = async (tokenAddress) => {
  const response = await fetch('/api/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenAddress })
  });
  return await response.json();
};

// Get market cap data
const getMarketCap = async () => {
  const response = await fetch('/api/market-cap');
  return await response.json();
};

// Get top holders
const getHolders = async () => {
  const response = await fetch('/api/holders');
  return await response.json();
};

// Get distribution preview
const getDistribution = async () => {
  const response = await fetch('/api/distribution');
  return await response.json();
};
```

### Real-time Updates

```javascript
// Update market cap every 10 seconds
setInterval(async () => {
  const data = await getMarketCap();
  updateMarketCapDisplay(data);
}, 10000);
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Internal Server Error

Error responses include a message:
```json
{
  "error": "No token address set"
}
```

## Security Notes

- The server runs on localhost by default
- CORS is enabled for cross-origin requests
- API keys are server-side only
- No sensitive data is exposed in responses
