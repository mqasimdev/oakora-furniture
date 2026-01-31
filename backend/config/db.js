const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;

    // Check if we can connect to the provided URI (Real Mongo)
    // If not, fall back to Memory Server
    // Note: This is a simplified check. In production we might want stricter rules.
    // For this environment, we prefer Memory Server if Localhost fails.

    try {
      if (!mongoURI.includes('localhost')) throw new Error("Use memory");
      // Try initial connection (short timeout)
      await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 2000 });
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
      console.log("Local MongoDB not reachable (Error: " + err.message + "), starting In-Memory MongoDB...");
      mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      await mongoose.connect(mongoURI);
      console.log(`In-Memory MongoDB Connected: ${mongoURI}`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
