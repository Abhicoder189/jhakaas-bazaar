import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

// Route imports
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import retailerRoutes from './routes/retailerRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database immediately for serverless
connectDB().catch(err => console.error('DB connection failed:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/retailers', retailerRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: '🛍️ Welcome to Jhakaas Bazaar API' });
});

// Health check with DB status
app.get('/api/health', async (req, res) => {
  try {
    const mongoose = (await import('mongoose')).default;
    res.json({ 
      status: 'ok', 
      dbStatus: mongoose.connection.readyState,
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
