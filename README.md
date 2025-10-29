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
````markdown
# 🛍️ Jhakaas Bazaar — MERN eCommerce (updated)

A full-stack marketplace showcasing handcrafted Indian goods. This README is a concise, up-to-date guide for development and deployment (frontend and backend are deployed separately).

![Jhakaas Bazaar](https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800)

## Quick summary
- Stack: MongoDB (Atlas), Express, React (Vite), Node.js
- Frontend: React + Vite, Tailwind CSS, Redux Toolkit
- Backend: Express + Mongoose, JWT auth, serverless-friendly DB connection
- Deployment: Frontend & Backend as separate Vercel projects; MongoDB Atlas for production

## What changed (important)
- Frontend and backend are deployed as separate Vercel projects.
- Frontend uses an env var `VITE_API_BASE_URL` (no trailing slash) — the axios client appends `/api`.
- Frontend includes `frontend/vercel.json` to rewrite all routes to `index.html` (fixes reload 404s for client-side routing).
- Backend includes CORS configuration to allow Vercel preview and your frontend domain.

## Local setup (short)

Prerequisites: Node.js (v16+ recommended), npm, MongoDB or MongoDB Atlas account

1) Clone
```bash
git clone <repo-url>
cd jhakaas-bazaar
```

2) Backend (run locally)
```bash
cd backend
npm install
cp .env.example .env   # edit values (or create .env)
# required env vars: MONGODB_URI, JWT_SECRET, NODE_ENV
node seeder.js         # optional: seed demo users & products
npm run dev
```

3) Frontend (run locally)
```bash
cd frontend
npm install
npm run dev
```

Note: Frontend dev server proxies `/api` to your backend in development (check `frontend/package.json` proxy or axios base). When running frontend locally, `VITE_API_BASE_URL` can be empty so axios uses `/api`.

## Environment variables (essential)

Backend (`backend/.env` on Vercel or local):
- MONGODB_URI — MongoDB connection string (use Atlas for production)
- JWT_SECRET — secret for signing tokens
- NODE_ENV — production/development
- OPENAI_API_KEY or GEMINI_API_KEY — optional for chatbot

Frontend (Vercel project settings):
- VITE_API_BASE_URL — e.g. `https://your-backend.vercel.app` (do NOT add a trailing slash or `/api`)

Common gotcha: if `VITE_API_BASE_URL` has a trailing slash you may see `//api` double-slash URLs. Remove trailing slash or update frontend axios to sanitize the URL.

## Deployment (recommended)

Frontend (Vercel):
- Connect the `frontend` folder as a separate Vercel project (or point to repo and set root to `frontend`).
- Add the environment variable `VITE_API_BASE_URL` pointing to your backend Vercel URL (no trailing slash).
- Ensure `frontend/vercel.json` exists (this repo includes it) to allow SPA routing.

Backend (Vercel):
- Deploy the `backend` folder as a separate Vercel project (or use your preferred host).
- Set these environment variables in the backend project: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`, any API keys.
- The backend exposes API routes under `/api/*` (e.g. `/api/products`, `/api/users/login`).

MongoDB Atlas:
- Use an Atlas cluster connection string for production in `MONGODB_URI` (use a restricted DB user and environment secrets).

## Quick demo credentials (seeded by `seeder.js`)
- Admin: `admin@jhakaas.com` / `admin123`
- User: `user@test.com` / `test123`

## API overview (most-used endpoints)
- POST `/api/users/login` — login, returns JWT
- POST `/api/users/register` — register
- GET `/api/products` — list products (supports query filters)
- GET `/api/products/:id` — product details
- POST `/api/orders` — create order (authenticated)

## Troubleshooting (quick)
- Reload 404 on frontend routes: ensure `frontend/vercel.json` present and frontend project rewrites to `index.html`.
- CORS errors: verify backend CORS allows your frontend origin; verify `VITE_API_BASE_URL` matches backend host.
- Double-slash `//api` in URLs: remove trailing slash from `VITE_API_BASE_URL` or use the sanitized axios helper.

## Notes for maintainers
- The backend implements serverless-friendly DB connection caching in `backend/config/db.js` to reduce cold-start overhead on Vercel.
- When rejecting pending products from Admin, the API deletes them (see `backend/routes/retailerRoutes.js`).

---

If you'd like, I can also:
- Add a short `README` section with screenshots (assets) and a `Try it` deployment checklist.
- Update other docs (`DEPLOYMENT.md`) to match these instructions.

**Made with ❤️ for artisans**

````
```
