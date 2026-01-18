# Farm2Fork Hub API

Backend API for the Farm2Fork Hub micro-supply chain platform.

## Architecture

```
/server
 ├── app.js              # Express app configuration
 ├── server.js           # Server entry point
 ├── config/             # Configuration files
 ├── models/             # Mongoose schemas
 ├── routes/             # API route definitions
 ├── controllers/        # Request handlers
 ├── services/           # Business logic
 ├── middleware/         # Express middleware
 └── utils/              # Helper functions
```

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Access + Refresh Tokens)
- **Security**: bcryptjs, rate limiting

## Setup

1. **Install dependencies:**
```bash
cd server
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
```

3. **Start MongoDB:**
```bash
# Ensure MongoDB is running locally or update MONGODB_URI
```

4. **Run server:**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user (requires auth)

### Buy Requests

- `POST /api/buy-requests` - Create buy request (restaurant only)
- `GET /api/buy-requests` - Get all buy requests
- `POST /api/buy-requests/:id/claim` - Claim request (farmer only)

### Orders

- `GET /api/orders` - Get orders (filtered by role)
- `PATCH /api/orders/:id/status` - Update order status

### Supplier Profiles

- `GET /api/suppliers/profile` - Get supplier profile
- `PUT /api/suppliers/profile` - Update supplier profile

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Database Models

- **User**: Authentication and basic user info
- **BuyRequest**: Request posted by restaurants
- **Order**: Created when buy request is claimed
- **SupplierProfile**: Farmer profile with stats
- **Invoice**: Generated after order fulfillment
- **PaymentRecord**: Payment tracking (ready for gateway integration)

## Future Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced recommendation engine (ML)
- [ ] File upload for product images
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Mobile app API support

## Security Notes

- Passwords are hashed with bcrypt
- JWT tokens expire (15m access, 7d refresh)
- Rate limiting enabled
- Input validation on all endpoints
- CORS configured for frontend origin
