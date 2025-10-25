import mongoose from 'mongoose';

// Connection caching for serverless environments (Vercel). This avoids
// creating a new connection on every function invocation which can exhaust
// Atlas connection limits and cause buffering/timeouts.
let cached = global.__mongoose; // use a global variable between invocations
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!cached.promise) {
    const opts = {
      // Explicit options to avoid deprecation warnings and tune server selection
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Fail faster so we can surface errors to logs quickly
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      // family: 4 forces IPv4 which can avoid some DNS issues in cloud envs
      family: 4,
    };

    // Create connect promise once and cache it
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB Connected:', cached.conn.connection.host);
    return cached.conn;
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    console.error(err && err.stack ? err.stack : err);
    // Reset promise so subsequent attempts can retry
    cached.promise = null;
    throw err;
  }
};

export default connectDB;
