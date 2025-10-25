# 🚀 Quick Start Guide - Jhakaas Bazaar

Get up and running in 5 minutes!

## Step 1: Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
Make sure MongoDB is running on your system:
```powershell
# Check if MongoDB is running
mongosh
```

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Replace the `MONGODB_URI` in `.env`

## Step 3: Configure Environment

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jhakaas-bazaar
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# Optional: For AI Chatbot
OPENAI_API_KEY=your_openai_key_here
```

## Step 4: Seed Database

```powershell
cd backend
node seeder.js
```

You should see:
```
✅ MongoDB Connected
✅ Data cleared!
✅ Users created!
✅ Products created!
✅ Seed data inserted successfully!
```

## Step 5: Start Backend

```powershell
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
MongoDB Connected: localhost
```

## Step 6: Start Frontend

Open a **new terminal**:
```powershell
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 7: Open in Browser

Navigate to: **http://localhost:3000**

## Demo Accounts

### User Account
- Email: `user@test.com`
- Password: `test123`

### Admin Account
- Email: `admin@jhakaas.com`
- Password: `admin123`

## What to Try First

1. **Browse Products** - Visit the Shop page
2. **Add to Cart** - Click "Add" on any product
3. **Test Chatbot** - Click the floating chat icon (bottom-right)
4. **Login** - Use demo credentials
5. **Place Order** - Go to cart and checkout
6. **Admin Panel** - Login as admin and manage products

## Troubleshooting

### Port Already in Use
```powershell
# Backend (5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Try using `127.0.0.1` instead of `localhost`

### Module Not Found
```powershell
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Next Steps

- Customize the color scheme in `frontend/tailwind.config.js`
- Add your own products via Admin Dashboard
- Configure OpenAI API key for smart chatbot
- Deploy to Vercel (frontend) and Render (backend)

## Need Help?

Check the main [README.md](README.md) for detailed documentation.

---

**Happy Building! 🎉**
