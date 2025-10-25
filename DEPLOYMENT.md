# Deployment Guide — Vercel (Frontend + Backend) with MongoDB Atlas

This guide explains how to deploy Jhakaas Bazaar with both frontend and backend on Vercel, connected to MongoDB Atlas.

## Prerequisites
- MongoDB Atlas account with a cluster set up
- Vercel account
- GitHub repository with your code

## 1. Set Up MongoDB Atlas
1. Go to https://cloud.mongodb.com and create a free M0 cluster
2. Create a database user (Database Access) with username and password
3. Add network access (Network Access) - use `0.0.0.0/0` for Vercel or restrict to specific IPs
4. Get your connection string from "Connect" → "Connect your application":
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
5. **Important**: If your password has special characters (`@`, `:`, `/`, `?`, `#`, `%`), URL-encode them

## 2. Deploy Backend to Vercel

### Option A: Via Vercel Dashboard (Recommended for first deployment)
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
4. Add Environment Variables:
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: A strong random string (generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: (if using the chatbot feature)
5. Click "Deploy"

### Option B: Via Vercel CLI
```powershell
cd "c:\files\it workshop project\jhakaas-bazaar"
npm install -g vercel
vercel login
vercel --prod
```

During setup, add environment variables when prompted or set them via dashboard.

## 3. Deploy Frontend to Vercel

### Create a separate Vercel project for the frontend:
1. Go to https://vercel.com/new (or use CLI)
2. Import the same repository (Vercel allows multiple projects from one repo)
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your backend Vercel URL (e.g., `https://jhakaas-backend.vercel.app`)
   - **Do NOT include `/api` at the end** — the frontend code automatically appends it
5. Click "Deploy"

## 4. Verify Deployment

### Backend:
- Visit `https://your-backend.vercel.app/` - should show: `{"message":"🛍️ Welcome to Jhakaas Bazaar API"}`
- Visit `https://your-backend.vercel.app/api/health` - should show: `{"status":"ok","timestamp":"..."}`
- Visit `https://your-backend.vercel.app/api/products` - should return product data

### Frontend:
- Visit your frontend URL
- Check browser DevTools Network tab to confirm API calls go to your backend URL
- Test login, product browsing, cart functionality

## 5. Seed the Database (One-Time Setup) ⚠️ REQUIRED

**You MUST run the seeder before admin login will work!**

Run the seeder locally to populate your Atlas database:

```powershell
cd backend
# Make sure MONGODB_URI in .env points to Atlas
node seeder.js
```

This creates:
- Admin user: `admin@jhakaas.com` / `admin123`
- Test user: `user@test.com` / `test123`
- Retailer: `retailer@test.com` / `retailer123`
- Sample products

**Without running the seeder, you cannot login as admin!**

## 6. Local Development

### Backend:
```powershell
cd backend
# Make sure .env has MONGODB_URI pointing to Atlas
npm install
npm run dev
```

### Frontend:
```powershell
cd frontend
# Create .env with VITE_API_BASE_URL=http://localhost:5000
npm install
npm run dev
```

## Troubleshooting

### "Operation buffering timed out" error:
- ✅ Verify `MONGODB_URI` is set correctly in Vercel (check for typos)
- ✅ Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- ✅ Ensure password is URL-encoded if it contains special characters
- ✅ Verify database user exists and has read/write permissions
- ✅ Check Vercel deployment logs for connection errors

### Frontend can't reach backend:
- ✅ Verify `VITE_API_BASE_URL` is set in frontend Vercel project
- ✅ Redeploy frontend after adding the env variable
- ✅ Check browser Network tab - requests should go to your backend URL
- ✅ Test backend endpoints directly (visit `/api/products` in browser)

### CORS errors:
- Backend uses `cors()` which allows all origins by default
- If you need to restrict, update `backend/server.js` to whitelist your frontend domain

## Environment Variables Summary

### Backend Vercel Project:
- `MONGODB_URI` (required)
- `JWT_SECRET` (required)
- `NODE_ENV=production` (recommended)
- `GEMINI_API_KEY` (optional, for chatbot)

### Frontend Vercel Project:
- `VITE_API_BASE_URL` (required) - your backend URL without trailing `/api`

## Updating Your App

Push to GitHub `main` branch and Vercel will automatically redeploy both projects (if you enabled Git integration).


4) Optional: Seed the database
 - The repo includes `backend/seeder.js`. To seed locally or on a staging server run:

  cd backend
  node seeder.js

 - Make sure `MONGODB_URI` is set in the environment where you run the seeder.

5) Verification
 - After deployment, visit the backend root route `/` to see the welcome JSON.
 - Test an API endpoint (e.g., GET `/api/products`) using curl or Postman.

6) Security notes
 - Do not commit `.env` to git. Add secrets to the hosting provider's config vars.
 - Use a strong `JWT_SECRET` and rotate keys if they are leaked.

If you want, I can:
- Add a `backend/.env.example` (done) and a `Procfile`/`Dockerfile` for Heroku/Render (I previously prepared them — tell me if you'd like them committed again).
- Create a small checklist with exact Render/Heroku steps for this repo with screenshots/text.
