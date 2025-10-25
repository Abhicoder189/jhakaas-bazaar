import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {
      // Mongoose 6+ uses these by default but explicit here for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Shorten server selection timeout to fail faster in logs (ms)
      serverSelectionTimeoutMS: 10000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // log full stack for debugging in deployment logs
    console.error('MongoDB connection error:', error.message);
    console.error(error.stack);
    // throw so caller (server start) can decide how to handle (and log)
    throw error;
  }
};

export default connectDB;
