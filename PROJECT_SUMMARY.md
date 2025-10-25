# 📋 Jhakaas Bazaar - Complete MERN Stack eCommerce

## Project Overview

**Jhakaas Bazaar** is a full-stack eCommerce web application celebrating India's rich cultural heritage and artisan craftsmanship. Built with modern technologies and featuring a beautiful Indian-themed design.

---

## ✅ Completed Features

### 🎨 **Frontend (React + Vite + Tailwind CSS)**

#### Pages
- ✅ **Home Page** - Hero section, categories, featured products, why choose us, about section
- ✅ **Shop Page** - Product listing with filters (category, price range, search)
- ✅ **Cart Page** - Shopping cart with quantity management, order summary, checkout
- ✅ **Login/Register Pages** - User authentication with validation
- ✅ **Profile Page** - User info and order history
- ✅ **Admin Dashboard** - Product CRUD, order management with status updates
- ✅ **About Page** - Company story and mission
- ✅ **Contact Page** - Contact form and business information

#### Components
- ✅ **Navbar** - Responsive navigation with cart badge and user menu
- ✅ **Footer** - Links, contact info, social media
- ✅ **ProductCard** - Beautiful product cards with add to cart
- ✅ **Chatbot** - Floating AI assistant with collapsible chat window
- ✅ **Loader** - Loading spinner
- ✅ **Message** - Alert/notification component

#### State Management (Redux Toolkit)
- ✅ **Auth Slice** - User authentication state
- ✅ **Product Slice** - Product listing and details
- ✅ **Cart Slice** - Shopping cart with localStorage persistence
- ✅ **Chat Slice** - Chatbot messages and history

#### Styling
- ✅ **Tailwind CSS** - Custom configuration with Indian color palette
- ✅ **Custom Colors** - Saffron, Maroon, Beige, Gold themes
- ✅ **Background Patterns** - Mandala and Paisley SVG patterns
- ✅ **Animations** - Smooth transitions, hover effects, floating animations
- ✅ **Responsive Design** - Mobile, tablet, desktop optimized

---

### 🔧 **Backend (Node.js + Express + MongoDB)**

#### Database Models (Mongoose)
- ✅ **User Model** - Name, email, password (bcrypt hashed), role (user/admin)
- ✅ **Product Model** - Name, description, price, category, image, stock, rating, featured
- ✅ **Order Model** - User reference, order items, total price, status
- ✅ **Chat Model** - Session ID, messages (user/assistant), timestamps

#### API Routes

**Authentication** (`/api/users`)
- ✅ `POST /register` - Register new user
- ✅ `POST /login` - Login with JWT token
- ✅ `GET /profile` - Get user profile (Protected)

**Products** (`/api/products`)
- ✅ `GET /` - Get all products (with optional filters)
- ✅ `GET /:id` - Get single product
- ✅ `POST /` - Create product (Admin only)
- ✅ `PUT /:id` - Update product (Admin only)
- ✅ `DELETE /:id` - Delete product (Admin only)

**Orders** (`/api/orders`)
- ✅ `POST /` - Create new order (Protected)
- ✅ `GET /myorders` - Get user orders (Protected)
- ✅ `GET /:id` - Get order by ID (Protected)
- ✅ `GET /` - Get all orders (Admin only)
- ✅ `PUT /:id/status` - Update order status (Admin only)

**Chatbot** (`/api/chat`)
- ✅ `POST /` - Send chat message (AI response)
- ✅ `GET /:sessionId` - Get chat history

#### Middleware
- ✅ **Auth Middleware** - JWT token verification
- ✅ **Admin Middleware** - Admin role check
- ✅ **Error Middleware** - Global error handling
- ✅ **CORS** - Cross-origin resource sharing enabled

#### Security
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Bcrypt** - Password hashing with salt
- ✅ **Protected Routes** - User and admin authorization
- ✅ **Input Validation** - Express-validator integration

#### Database Seeder
- ✅ **Sample Data** - 12 products across 5 categories
- ✅ **Demo Users** - Regular user and admin account
- ✅ **One-command setup** - `node seeder.js`

---

### 🤖 **AI Chatbot Features**

- ✅ **Floating Widget** - Bottom-right positioned, collapsible
- ✅ **Product Search** - Search products by name/category
- ✅ **Recommendations** - Show featured/trending products
- ✅ **FAQ Responses** - Shipping, returns, payment info
- ✅ **Mock Mode** - Works without API key (default)
- ✅ **OpenAI Integration** - Optional GPT-3.5/4 support
- ✅ **Gemini Integration** - Alternative AI provider ready
- ✅ **Chat History** - Stored in MongoDB and localStorage
- ✅ **Session Management** - Unique session IDs for tracking
- ✅ **Quick Suggestions** - Predefined query buttons

---

## 🎨 Design System

### Color Palette
```css
Saffron:
  - Primary: #f97316
  - Hover: #ea580c

Maroon:
  - Primary: #800020
  - Dark: #5f1818

Beige:
  - Light: #faf8f5
  - Primary: #e6dcc1

Gold:
  - Primary: #f59e0b
  - Light: #fef3c7
```

### Typography
- **Display Font**: Playfair Display (serif)
- **Body Font**: Inter (sans-serif)

### UI Components
- Custom button styles (primary, secondary, outline)
- Card components with hover effects
- Input fields with focus states
- Badge components for tags/status
- Gradient text effects
- Background patterns (mandala, paisley)

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1",
  "axios": "^1.6.2"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "@reduxjs/toolkit": "^2.0.1",
  "react-redux": "^9.0.4",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 🔐 Authentication Flow

1. **Register** → User creates account → Password hashed with bcrypt → JWT token generated
2. **Login** → Credentials verified → JWT token returned → Stored in localStorage
3. **Protected Routes** → Token verified on each request → User info attached to req.user
4. **Admin Access** → Additional role check for admin-only routes

---

## 🛒 Shopping Flow

1. **Browse** → View products on home/shop page
2. **Filter** → Search by category, price, or keywords
3. **Add to Cart** → Product added to Redux state and localStorage
4. **Update Cart** → Adjust quantity or remove items
5. **Checkout** → Login required → Order created in database
6. **View Orders** → See order history in profile page

---

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['user', 'admin'],
  timestamps: true
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: Enum,
  image: String (URL),
  stock: Number,
  rating: Number,
  numReviews: Number,
  featured: Boolean,
  timestamps: true
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  orderItems: [{
    product: ObjectId,
    name: String,
    quantity: Number,
    image: String,
    price: Number
  }],
  totalPrice: Number,
  status: Enum,
  timestamps: true
}
```

### Chat
```javascript
{
  user: ObjectId (optional),
  sessionId: String,
  messages: [{
    role: Enum ['user', 'assistant'],
    content: String,
    timestamp: Date
  }],
  timestamps: true
}
```

---

## 🚀 Deployment Ready

### Frontend (Vercel)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: None needed (uses proxy in dev)

### Backend (Render/Railway)
- Start command: `node server.js`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`
- Node version: 20+

### Database (MongoDB Atlas)
- Free tier available
- Connection string format: `mongodb+srv://...`
- Whitelist all IPs (0.0.0.0/0) or specific IPs

---

## 📝 TODO / Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Image upload for products
- [ ] Advanced search with Elasticsearch
- [ ] Social media authentication
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Performance optimizations (lazy loading, code splitting)

---

## 🎯 Key Achievements

✅ Full MERN stack implementation  
✅ Modern UI with Tailwind CSS  
✅ Complete authentication system  
✅ Admin dashboard with CRUD  
✅ AI-powered chatbot  
✅ Responsive design  
✅ Redux state management  
✅ RESTful API design  
✅ Security best practices  
✅ Professional documentation  

---

**Built with ❤️ for India's artisans**
