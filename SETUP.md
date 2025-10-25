# 🎯 Setup Instructions for Jhakaas Bazaar

Follow these steps in order to get the application running on your local machine.

---

## ⚙️ Prerequisites

Before starting, make sure you have:

- ✅ **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- ✅ **Git** (optional) - For version control
- ✅ **Code Editor** - VS Code recommended

Check your installations:
```powershell
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
mongosh           # Should connect to MongoDB (if using local)
```

---

## 📦 Step 1: Navigate to Project

```powershell
cd "c:\files\it workshop project\jhakaas-bazaar"
```

---

## 🔧 Step 2: Setup Backend

### 2.1 Install Backend Dependencies
```powershell
cd backend
npm install
```

This will install:
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- JWT & Bcrypt (authentication)
- Axios, CORS, dotenv, etc.

### 2.2 Create Environment File

Create a new file `backend\.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jhakaas-bazaar
JWT_SECRET=jhakaas_secret_key_2025_change_in_production
NODE_ENV=development

# Optional: For AI Chatbot (get free key from OpenAI)
# OPENAI_API_KEY=sk-your-key-here
```

**Important**: Change `JWT_SECRET` to a random secure string in production!

### 2.3 Start MongoDB

#### Option A: Local MongoDB
```powershell
# MongoDB should be running as a service
# Check status in Services or start manually:
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jhakaas-bazaar
```

### 2.4 Seed Database
```powershell
# Make sure you're in the backend directory
node seeder.js
```

Expected output:
```
MongoDB Connected: localhost
Data cleared!
Users created!
Products created!
✅ Seed data inserted successfully!
```

This creates:
- 2 users (1 regular, 1 admin)
- 12 sample products across 5 categories

### 2.5 Start Backend Server
```powershell
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
MongoDB Connected: localhost
```

**Keep this terminal open!** Backend is now running on `http://localhost:5000`

---

## 🎨 Step 3: Setup Frontend

### 3.1 Open New Terminal

Open a **new PowerShell terminal** (don't close the backend terminal)

```powershell
cd "c:\files\it workshop project\jhakaas-bazaar\frontend"
```

### 3.2 Install Frontend Dependencies
```powershell
npm install
```

This will install:
- React 18 + React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- Redux Toolkit (state management)
- React Router (routing)
- Axios (API calls)
- React Icons

### 3.3 Start Frontend Server
```powershell
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Keep this terminal open too!** Frontend is now running on `http://localhost:3000`

---

## 🌐 Step 4: Open in Browser

Navigate to: **http://localhost:3000**

You should see the Jhakaas Bazaar homepage with:
- Hero banner: "Discover India's Finest Creations"
- Category cards (Handicrafts, Apparel, Jewelry, etc.)
- Featured products grid
- Floating chatbot icon (bottom-right)

---

## 👤 Step 5: Test the Application

### Login with Demo Accounts

#### Regular User
- Email: `user@test.com`
- Password: `test123`

#### Admin User
- Email: `admin@jhakaas.com`
- Password: `admin123`

### Things to Try

1. **Browse Products**
   - Click "Shop" in navbar
   - Try filters (category, price range, search)

2. **Add to Cart**
   - Click "Add" button on any product
   - See cart badge update in navbar
   - Go to cart page

3. **Checkout** (requires login)
   - Login with user account
   - Go to cart
   - Click "Place Order"
   - View order in Profile page

4. **Test Chatbot**
   - Click floating chat icon (bottom-right)
   - Try queries:
     - "Search for handicrafts"
     - "Show me bestsellers"
     - "Tell me about shipping"
     - "Return policy"

5. **Admin Dashboard** (requires admin login)
   - Login with admin account
   - Click "Admin" in navbar
   - Add/Edit/Delete products
   - View and update orders

---

## 🔧 Troubleshooting

### ❌ "Port 5000 is already in use"
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### ❌ "Port 3000 is already in use"
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

### ❌ "Cannot connect to MongoDB"

**Check if MongoDB is running:**
```powershell
mongosh
```

If it fails:
- Make sure MongoDB service is started
- Or use MongoDB Atlas (cloud)
- Check `MONGODB_URI` in backend `.env`

### ❌ "Module not found" errors
```powershell
# Delete node_modules and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### ❌ JWT/Authentication errors
- Make sure `JWT_SECRET` is set in backend `.env`
- Clear browser localStorage and cookies
- Re-login

---

## 🎨 Customize the App

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  saffron: {
    // Change these hex values
    600: '#f97316',
  },
  // ... more colors
}
```

### Add Your Own Products
1. Login as admin
2. Go to Admin Dashboard
3. Click "Add New Product"
4. Fill in details and submit

### Configure AI Chatbot
1. Get OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `backend/.env`:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```
3. Restart backend server

---

## 📚 Next Steps

- ✅ Read [README.md](README.md) for full documentation
- ✅ Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for features
- ✅ See [FILE_STRUCTURE.md](FILE_STRUCTURE.md) for code organization
- ✅ Deploy to production (Vercel + Render)

---

## 🚀 Production Deployment

### Frontend (Vercel)
```powershell
cd frontend
npm run build
# Upload 'dist' folder to Vercel or use Vercel CLI
```

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy!

### Database (MongoDB Atlas)
- Already cloud-based if using Atlas
- Update `MONGODB_URI` with production connection string

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Review the troubleshooting section above
3. Make sure all dependencies are installed
4. Verify MongoDB is running
5. Check `.env` file configuration

---

**Happy Coding! 🎉**

Your MERN stack eCommerce application is ready to go!
