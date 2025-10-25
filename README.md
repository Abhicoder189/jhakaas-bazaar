# 🛍️ Jhakaas Bazaar - Complete MERN eCommerce Application

A modern, full-stack eCommerce platform celebrating India's finest artisans and craftspeople. Built with the MERN stack (MongoDB, Express, React, Node.js) featuring a beautiful Indian-themed design, AI-powered chatbot, and complete shopping functionality.

![Jhakaas Bazaar](https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800)

## ✨ Features

### 🎨 **Modern Indian Design**
- Warm color palette (saffron, maroon, beige, gold)
- Subtle cultural motifs (mandala, paisley patterns)
- Smooth animations and transitions
- Fully responsive for all devices

### 🛒 **Complete eCommerce Functionality**
- Browse products with filtering and search
- Shopping cart with quantity management
- User authentication (register/login with JWT)
- Order management and history
- Product categories and featured items

### 👨‍💼 **Admin Dashboard**
- Full CRUD operations on products
- Order management with status updates
- User management
- Protected admin routes

### 🤖 **AI-Powered Chatbot**
- Product search and recommendations
- FAQ responses (shipping, returns, etc.)
- Integrated with OpenAI/Gemini API
- Chat history stored in MongoDB
- Beautiful floating chat widget

### 🔐 **Security Features**
- JWT-based authentication
- Bcrypt password hashing
- Protected routes (user & admin)
- CORS enabled

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router v6** for routing
- **Axios** for API calls
- **React Icons** for icons

### Backend
- **Node.js** (v20+)
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Axios** for external API calls

## 📁 Project Structure

```
jhakaas-bazaar/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   ├── Order.js              # Order schema
│   │   └── Chat.js               # Chat schema
│   ├── routes/
│   │   ├── userRoutes.js         # Auth routes
│   │   ├── productRoutes.js      # Product CRUD
│   │   ├── orderRoutes.js        # Order management
│   │   └── chatRoutes.js         # AI chatbot
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT & admin middleware
│   │   └── errorMiddleware.js    # Error handling
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── server.js                 # Express server
│   ├── seeder.js                 # Database seeder
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/                  # API service layer
    │   ├── components/           # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── Chatbot.jsx
    │   │   ├── Loader.jsx
    │   │   └── Message.jsx
    │   ├── pages/                # Route pages
    │   │   ├── Home.jsx
    │   │   ├── Shop.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Profile.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── store/                # Redux store
    │   │   ├── store.js
    │   │   └── slices/
    │   │       ├── authSlice.js
    │   │       ├── productSlice.js
    │   │       ├── cartSlice.js
    │   │       └── chatSlice.js
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── tailwind.config.js        # Tailwind configuration
    ├── vite.config.js            # Vite configuration
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v20 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jhakaas-bazaar
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jhakaas-bazaar
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Optional: Add your OpenAI API key for chatbot
OPENAI_API_KEY=your_openai_api_key_here

# Or use Gemini API instead
# GEMINI_API_KEY=your_gemini_api_key_here
```

**Seed the Database** with sample products and users:
```bash
node seeder.js
```

**Start the Backend Server:**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

**Start the Frontend Development Server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 👤 Demo Credentials

After seeding the database, you can use these credentials:

### User Account
- **Email:** user@test.com
- **Password:** test123

### Admin Account
- **Email:** admin@jhakaas.com
- **Password:** admin123

## 🎯 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Chatbot
- `POST /api/chat` - Send chat message
- `GET /api/chat/:sessionId` - Get chat history

## 🤖 Chatbot Configuration

The chatbot has three modes:

### 1. **Mock Mode** (Default)
Works out of the box with predefined responses for:
- Product search
- Recommendations
- Shipping FAQs
- Return policy
- About the store

### 2. **OpenAI Mode**
Add your OpenAI API key to `.env`:
```env
OPENAI_API_KEY=sk-your-key-here
```

### 3. **Gemini Mode**
Add your Gemini API key to `.env`:
```env
GEMINI_API_KEY=your-gemini-key-here
```
(Update `chatRoutes.js` to use Gemini instead of OpenAI)

## 📦 Sample Products

The seeder creates 12 sample products across 5 categories:
- **Handicrafts** - Wooden sculptures, pottery, terracotta
- **Apparel** - Silk sarees, block print kurtas
- **Jewelry** - Kundan sets, silver anklets
- **Home Décor** - Brass diyas, Madhubani paintings, cushion covers
- **Accessories** - Pashmina shawls, Kolhapuri chappals

## 🎨 Color Palette

```css
Saffron: #f97316
Maroon: #800020
Beige: #e6dcc1
Gold: #f59e0b
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to Vercel
```

### Backend (Render/Railway)
1. Push your code to GitHub
2. Connect to Render/Railway
3. Add environment variables
4. Deploy

### MongoDB Atlas
Use MongoDB Atlas for production database:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jhakaas-bazaar
```

## 🔧 Development

### Run Backend in Dev Mode
```bash
cd backend
npm run dev
```

### Run Frontend in Dev Mode
```bash
cd frontend
npm run dev
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from React Icons
- Fonts from Google Fonts (Inter, Playfair Display)

## 📧 Contact

For questions or support:
- Email: support@jhakaasbazaar.com
- Website: [Jhakaas Bazaar](https://jhakaasbazaar.com)

---

**Made with ❤️ to celebrate India's incredible artisans and craftspeople**
