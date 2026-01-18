# Farm2Fork Hub API Documentation

Complete API reference for the Farm2Fork Hub backend.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication via Bearer token:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "restaurant" | "farmer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "restaurant"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

### Buy Requests

#### Create Buy Request (Restaurant only)
```http
POST /api/buy-requests
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "item": "Organic Tomatoes",
  "quantity": "10 kg",
  "deliveryDate": "2024-12-25"
}
```

#### Get Buy Requests
```http
GET /api/buy-requests?status=open
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `status`: Filter by status (`open`, `claimed`, `cancelled`)

#### Claim Buy Request (Farmer only)
```http
POST /api/buy-requests/:id/claim
Authorization: Bearer <access_token>
```

### Orders

#### Get Orders
```http
GET /api/orders?status=pending
Authorization: Bearer <access_token>
```

#### Update Order Status
```http
PATCH /api/orders/:id/status
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "delivered"
}
```

**Valid statuses:** `pending`, `confirmed`, `in_transit`, `delivered`, `cancelled`

### Supplier Profiles

#### Get Profile (Farmer only)
```http
GET /api/suppliers/profile
Authorization: Bearer <access_token>
```

#### Update Profile (Farmer only)
```http
PUT /api/suppliers/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "products": ["Tomatoes", "Lettuce", "Honey"],
  "location": "San Francisco, CA"
}
```

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "role": "restaurant" | "farmer",
  "onboardingCompleted": "boolean",
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}
```

### BuyRequest
```json
{
  "_id": "ObjectId",
  "restaurant": "User ObjectId",
  "item": "string",
  "quantity": "string",
  "deliveryDate": "ISO Date",
  "status": "open" | "claimed" | "cancelled",
  "claimedBy": "User ObjectId | null",
  "claimedAt": "ISO Date | null",
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}
```

### Order
```json
{
  "_id": "ObjectId",
  "buyRequest": "BuyRequest ObjectId",
  "restaurant": "User ObjectId",
  "supplier": "User ObjectId",
  "item": "string",
  "quantity": "string",
  "deliveryDate": "ISO Date",
  "status": "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled",
  "fulfilledAt": "ISO Date | null",
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common Status Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited to 100 requests per 15 minutes per IP.
