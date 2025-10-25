# VERCEL CONFIGURATION REQUIRED

Since you have a monorepo, you need to configure Vercel correctly:

## IN VERCEL DASHBOARD:

1. **Go to:** Your Project → Settings → General

2. **Set these Build & Development Settings:**
   - Framework Preset: `Other`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (Settings → Environment Variables):
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: Random string for JWT
   - `NODE_ENV`: production
   - `GEMINI_API_KEY`: (optional, for chatbot)

4. **After saving, redeploy:**
   - Go to Deployments
   - Click "..." on latest
   - Click "Redeploy"

## How it works:
- Frontend builds from `/frontend` directory
- API functions in `/api` directory are auto-detected
- `/api/*` routes to serverless functions
- Everything else routes to frontend

## Test after deploy:
- Visit: https://your-app.vercel.app/
- Visit: https://your-app.vercel.app/api (should show API message)
- Try login
