# 📡 API Documentation - Jhakaas Bazaar

Complete reference for all REST API endpoints.

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 👤 User & Authentication Routes

### Register New User
```http
POST /api/users/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Login User
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### Get User Profile
```http
GET /api/users/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

---

## 📦 Product Routes

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (optional) - Filter by category
- `minPrice` (optional) - Minimum price
- `maxPrice` (optional) - Maximum price
- `featured` (optional) - "true" to get only featured products
- `search` (optional) - Search by name or description

**Example:**
```http
GET /api/products?category=Handicrafts&maxPrice=5000&featured=true
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Handwoven Silk Saree",
    "description": "Beautiful handwoven Banarasi silk saree...",
    "price": 12999,
    "category": "Apparel",
    "image": "https://example.com/image.jpg",
    "stock": 15,
    "rating": 4.8,
    "numReviews": 24,
    "featured": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

### Get Single Product
```http
GET /api/products/:id
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Handwoven Silk Saree",
  "description": "Beautiful handwoven Banarasi silk saree...",
  "price": 12999,
  "category": "Apparel",
  "image": "https://example.com/image.jpg",
  "stock": 15,
  "rating": 4.8,
  "numReviews": 24,
  "featured": true
}
```

**Error (404):**
```json
{
  "message": "Product not found"
}
```

---

### Create Product (Admin Only)
```http
POST /api/products
```

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Blue Pottery Vase",
  "description": "Stunning Jaipur blue pottery vase with floral motifs",
  "price": 2299,
  "category": "Handicrafts",
  "image": "https://example.com/vase.jpg",
  "stock": 25,
  "featured": true
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Blue Pottery Vase",
  "description": "Stunning Jaipur blue pottery vase...",
  "price": 2299,
  "category": "Handicrafts",
  "image": "https://example.com/vase.jpg",
  "stock": 25,
  "featured": true,
  "rating": 0,
  "numReviews": 0
}
```

---

### Update Product (Admin Only)
```http
PUT /api/products/:id
```

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:** (all fields optional)
```json
{
  "price": 1999,
  "stock": 30,
  "featured": false
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Blue Pottery Vase",
  "price": 1999,
  "stock": 30,
  "featured": false
}
```

---

### Delete Product (Admin Only)
```http
DELETE /api/products/:id
```

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "message": "Product removed"
}
```

---

## 🛒 Order Routes

### Create Order
```http
POST /api/orders
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439011",
      "name": "Handwoven Silk Saree",
      "quantity": 2,
      "image": "https://example.com/saree.jpg",
      "price": 12999
    }
  ],
  "totalPrice": 25998
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "user": "507f1f77bcf86cd799439011",
  "orderItems": [...],
  "totalPrice": 25998,
  "status": "Pending",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

### Get My Orders
```http
GET /api/orders/myorders
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "orderItems": [
      {
        "product": "507f1f77bcf86cd799439011",
        "name": "Handwoven Silk Saree",
        "quantity": 2,
        "image": "https://example.com/saree.jpg",
        "price": 12999
      }
    ],
    "totalPrice": 25998,
    "status": "Pending",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

### Get Order by ID
```http
GET /api/orders/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orderItems": [...],
  "totalPrice": 25998,
  "status": "Pending"
}
```

---

### Get All Orders (Admin Only)
```http
GET /api/orders
```

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [...],
    "totalPrice": 25998,
    "status": "Pending",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

### Update Order Status (Admin Only)
```http
PUT /api/orders/:id/status
```

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Allowed Status Values:**
- `Pending`
- `Processing`
- `Shipped`
- `Delivered`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "status": "Shipped",
  "totalPrice": 25998
}
```

---

## 💬 Chat Routes

### Send Chat Message
```http
POST /api/chat
```

**Request Body:**
```json
{
  "message": "Search for handicrafts",
  "sessionId": "session_1234567890"
}
```

**Response (200):**
```json
{
  "response": "I found 3 product(s) for you:\n\n🛍️ **Wooden Elephant Statue** - ₹2499\nHand-carved rosewood elephant statue...",
  "sessionId": "session_1234567890"
}
```

**Chatbot Features:**
- Product search by keyword
- Recommendations (featured products)
- FAQ responses (shipping, returns, payment, about)
- Optional OpenAI/Gemini integration

---

### Get Chat History
```http
GET /api/chat/:sessionId
```

**Response (200):**
```json
[
  {
    "role": "user",
    "content": "Search for handicrafts",
    "timestamp": "2025-01-15T10:30:00.000Z"
  },
  {
    "role": "assistant",
    "content": "I found 3 product(s) for you...",
    "timestamp": "2025-01-15T10:30:05.000Z"
  }
]
```

---

## 🚫 Error Responses

### 400 - Bad Request
```json
{
  "message": "Invalid user data"
}
```

### 401 - Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 - Forbidden
```json
{
  "message": "Not authorized as admin"
}
```

### 404 - Not Found
```json
{
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "message": "Internal server error",
  "stack": "Error stack trace (development only)"
}
```

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get Products with Filters
```bash
curl "http://localhost:5000/api/products?category=Handicrafts&maxPrice=5000"
```

### Create Order (Protected)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "orderItems": [...],
    "totalPrice": 25998
  }'
```

---

## 🔑 Rate Limiting

Currently no rate limiting implemented. Consider adding in production:
- `express-rate-limit` package
- Limit to 100 requests per 15 minutes per IP

---

## 📦 Postman Collection

You can import all these endpoints into Postman for easier testing:

1. Create new Collection
2. Add requests for each endpoint
3. Set environment variables for `baseURL` and `token`

---

**API documentation complete! 🎉**

For more details, check the route files in `backend/routes/`
