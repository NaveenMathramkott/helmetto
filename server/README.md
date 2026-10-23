# Helmetto E-Commerce Server

A MERN stack e-commerce backend API built with Express.js, MongoDB, and JWT authentication.

## Architecture Overview

```
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication & order logic
│   ├── categoryController.js # Category CRUD operations
│   └── productController.js  # Product CRUD, filters, search, payments
├── helpers/
│   └── authHelpers.js        # Password hashing/comparison
├── middlewares/
│   └── authMiddleWare.js     # JWT verification & role-based access
├── models/
│   ├── userModal.js          # User schema
│   ├── categoryModel.js      # Category schema
│   ├── productModel.js       # Product schema
│   └── orderModel.js         # Order schema
├── routes/
│   ├── authRoute.js          # Authentication routes
│   ├── categoryRoute.js      # Category routes
│   ├── productRoute.js       # Product routes
│   └── orderRoute.js         # Order & payment routes
├── .env                      # Environment variables
├── package.json              # Dependencies & scripts
└── server.js                 # Entry point
```

## Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcrypt
- **Payment Gateway**: Braintree (Sandbox)
- **Logging**: Morgan
- **CORS**: cors middleware
- **Slug Generation**: slugify

## Data Models

### User

| Field       | Type    | Required | Description              |
| ----------- | ------- | -------- | ------------------------ |
| name        | String  | Yes      | User's full name         |
| email       | String  | Yes      | Unique email             |
| password    | String  | Yes      | Hashed password          |
| address     | String  | No       | Shipping address         |
| phoneNumber | Number  | No       | Contact number           |
| answer      | String  | Yes      | Security question answer |
| admin       | Boolean | Yes      | Role flag                |

### Category

| Field | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| name  | String | No       | Category name     |
| slug  | String | No       | URL-friendly name |
| photo | String | No       | Image URL/Base64  |

### Product

| Field       | Type     | Required | Description           |
| ----------- | -------- | -------- | --------------------- |
| name        | String   | Yes      | Product name          |
| slug        | String   | Yes      | URL-friendly name     |
| description | String   | Yes      | Product description   |
| price       | Number   | Yes      | Product price         |
| category    | ObjectId | Yes      | Reference to Category |
| quantity    | Number   | Yes      | Stock quantity        |
| offer       | Number   | No       | Discount percentage   |
| total       | Number   | No       | Default: 1            |
| photo       | String   | No       | Image URL/Base64      |
| shipping    | Boolean  | No       | Shipping availability |

### Order

| Field    | Type       | Required | Description                                               |
| -------- | ---------- | -------- | --------------------------------------------------------- |
| products | ObjectId[] | Yes      | Array of product references                               |
| payment  | Object     | Yes      | Braintree payment object                                  |
| buyer    | ObjectId   | Yes      | Reference to User                                         |
| status   | String     | No       | Enum: Not Process, Processing, Shipped, Delivered, Cancel |

## Authentication & Authorization

- **JWT Token**: 4-day expiry, signed with `JWT_SECRET_KEY`
- **Headers**: `Authorization: <token>`
- **Roles**: Admin (`admin: true`) vs User (`admin: false`)
- **Middlewares**:
  - `requireSignIn` - Validates JWT token
  - `checkAdmin` - Allows only admin users
  - `checkUser` - Allows only non-admin users

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication (`/auth`)

| Method | Endpoint           | Access        | Description               |
| ------ | ------------------ | ------------- | ------------------------- |
| POST   | `/register`        | Public        | Register new user         |
| POST   | `/login`           | Public        | User login                |
| POST   | `/forgot-password` | Public        | Password reset            |
| GET    | `/test`            | Admin         | Test middleware           |
| GET    | `/admin-auth`      | Admin         | Admin authorization check |
| GET    | `/user-auth`       | User          | User authorization check  |
| PUT    | `/profile-update`  | Authenticated | Update user profile       |

#### Request/Response Examples

**Register**

```bash
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "admin": false,
  "answer": "security answer",
  "address": "123 Main St"
}
```

**Login**

```bash
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Categories (`/category`)

| Method | Endpoint                 | Access | Description         |
| ------ | ------------------------ | ------ | ------------------- |
| POST   | `/create-category`       | Admin  | Create new category |
| PUT    | `/update-category/:id`   | Admin  | Update category     |
| GET    | `/get-category`          | Public | Get all categories  |
| GET    | `/single-category/:slug` | Public | Get single category |
| DELETE | `/delete-category/:id`   | Admin  | Delete category     |

#### Create Category

```bash
POST /api/v1/category/create-category
Headers: Authorization: <admin_token>
{
  "name": "Electronics",
  "photo": "base64_or_url"
}
```

---

### Products (`/product`)

| Method | Endpoint                     | Access | Description                     |
| ------ | ---------------------------- | ------ | ------------------------------- |
| POST   | `/create-product`            | Admin  | Create new product              |
| PUT    | `/update-product/:pid`       | Admin  | Update product                  |
| GET    | `/get-product`               | Public | Get all products (limit 15)     |
| GET    | `/get-product/:slug`         | Public | Get single product              |
| DELETE | `/delete-product/:pid`       | Public | Delete product                  |
| POST   | `/product-filters`           | Public | Filter products                 |
| GET    | `/product-count`             | Public | Get total product count         |
| GET    | `/product-list/:page`        | Public | Get paginated products (6/page) |
| GET    | `/search/:keyword`           | Public | Search products                 |
| GET    | `/related-product/:pid/:cid` | Public | Get related products            |
| GET    | `/product-category/:slug`    | Public | Get products by category        |

#### Create Product

```bash
POST /api/v1/product/create-product
Headers: Authorization: <admin_token>
{
  "name": "iPhone 15",
  "description": "Latest iPhone",
  "price": 999,
  "category": "category_id",
  "quantity": 10,
  "photo": "base64_or_url",
  "offer": 10,
  "shipping": true
}
```

#### Filter Products

```bash
POST /api/v1/product/product-filters
{
  "checked": ["category_id_1", "category_id_2"],
  "radio": [100, 500]
}
```

---

### Orders & Payments (`/order`)

| Method | Endpoint                 | Access        | Description                |
| ------ | ------------------------ | ------------- | -------------------------- |
| POST   | `/orders`                | Authenticated | Get user's orders          |
| GET    | `/all-orders`            | Admin         | Get all orders             |
| PUT    | `/order-status/:orderId` | Admin         | Update order status        |
| GET    | `/braintree/token`       | Public        | Get Braintree client token |
| POST   | `/braintree/payment`     | Authenticated | Process payment            |

#### Get User Orders

```bash
POST /api/v1/order/orders
Headers: Authorization: <user_token>
{
  "id": "user_id"
}
```

#### Update Order Status

```bash
PUT /api/v1/order/order-status/order_id
Headers: Authorization: <admin_token>
{
  "status": "Shipped"
}
```

#### Process Payment

```bash
POST /api/v1/order/braintree/payment
Headers: Authorization: <user_token>
{
  "nonce": "braintree_nonce",
  "cart": [...products],
  "id": "user_id"
}
```

## Environment Variables

```env
PORT=8000
DEV_MODE=development
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET_KEY=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
```

## Installation & Running

```bash
# Install dependencies
npm install

# Development mode (with nodemon)
npm run server

# Production
npm start
```

## Project Scripts

| Script   | Command                                          |
| -------- | ------------------------------------------------ |
| `start`  | `node server.js`                                 |
| `server` | `npm server.js` (runs with nodemon)              |
| `client` | `npm start --prefix ../client`                   |
| `dev`    | `concurrently "npm run server" "npm run client"` |
| `build`  | `npm install`                                    |

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": {} // Optional error object
}
```

## Success Response Format

```json
{
  "success": true,
  "message": "Operation description",
  "data": {} // Response data
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
