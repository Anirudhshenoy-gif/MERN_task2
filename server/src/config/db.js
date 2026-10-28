const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/signup_db';
  try {
    // Attempt standard connection first with a 3s timeout
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Local MongoDB connection failed (${error.message}). Starting in-memory MongoDB server for testing/development...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      const conn = await mongoose.connect(inMemoryUri);
      console.log(`In-memory MongoDB Connected: ${conn.connection.host} (${inMemoryUri})`);
    } catch (memError) {
      console.error(`Failed to start in-memory MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
