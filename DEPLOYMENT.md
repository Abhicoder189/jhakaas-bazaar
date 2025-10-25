# Deployment guide — Frontend on Vercel/Netlify, Backend on Render/Heroku, MongoDB Atlas

This document explains how to switch the app from a local MongoDB (Compass) to MongoDB Atlas and deploy the frontend and backend to the chosen providers.

1) Create a MongoDB Atlas cluster
 - Go to https://www.mongodb.com/cloud/atlas and sign in or create an account.
 - Create a free Shared Cluster (M0). Choose a cloud provider and region near your users.
 - In "Database Access" create a database user with a username and password you will use in the connection string.
 - In "Network Access" add your app host IP ranges. For cloud hosts (Heroku/Render) use 0.0.0.0/0 (allows connections from anywhere) or restrict as needed.
 - In the Clusters UI click "Connect" -> "Connect your application" and copy the connection string. It will look like:
   `mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/<dbname>?retryWrites=true&w=majority`

2) Configure backend to use Atlas
 - The backend reads `process.env.MONGODB_URI` (see `backend/config/db.js`).
 - Locally: update `backend/.env` (or create it) and set `MONGODB_URI` to the Atlas string (replace `<username>`, `<password>`, `<dbname>`). Example:

  MONGODB_URI=mongodb+srv://jhakaasUser:SuperSecret123@cluster0.abcd.mongodb.net/jhakaasdb?retryWrites=true&w=majority

 - Production: set the environment variable in your host (Render/Heroku) — do NOT commit credentials to git.

3) Set environment variables on hosting platforms
 - Heroku
   - In the app dashboard -> Settings -> Reveal Config Vars, add `MONGODB_URI` and `JWT_SECRET` (and any other keys like `OPENAI_API_KEY`).
   - Ensure your `Procfile` contains: `web: npm start` and `start` script in `backend/package.json` runs `node server.js` (already present).

 - Render
   - For a Web Service, set Environment -> Environment Variables `MONGODB_URI`, `JWT_SECRET`.
   - Render automatically installs dependencies and runs `npm start` by default for Node apps.

 - Vercel/Netlify (frontend)
   - For frontend build, add any public env vars if required (but keep sensitive keys only on server). Typically no DB vars are needed for frontend.

If both projects are deployed to Vercel (frontend + backend)
 - Get the backend URL from Vercel (it will look like `https://<your-backend-project>.vercel.app`).
 - In your frontend project on Vercel go to Settings -> Environment Variables and add:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://<your-backend-project>.vercel.app` (do NOT add a trailing `/api` — the frontend will append `/api`).
   - Add the variable for the correct environment(s): Production (and Preview if you want preview deployments to call a staging backend).
 - Redeploy the frontend (trigger a new deployment from Vercel or push a commit).
 - The frontend uses `import.meta.env.VITE_API_BASE_URL` (see `frontend/src/api/axios.js`). Locally you can set this in your shell or a `.env` file for `vite` as:

  VITE_API_BASE_URL=http://localhost:5000

 - CORS: the backend currently uses `cors()` (allow all origins) so it should accept requests from the frontend. If you tighten CORS in production, add the frontend origin (e.g., `https://<your-frontend>.vercel.app`) to the allowed list.

 - Example full API endpoint after integration: `https://<your-backend-project>.vercel.app/api/products`.

Troubleshooting
 - If you see network errors in browser devtools:
   - Confirm `VITE_API_BASE_URL` is set in Vercel for the Production environment and that the frontend was redeployed after adding it.
   - Check backend logs in Vercel to see incoming requests and any errors.
   - Test the backend endpoint directly in the browser or curl to ensure it's reachable.


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
