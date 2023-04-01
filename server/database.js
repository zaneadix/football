import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}`, { dbName: MONGODB_DB }).then(mongoose => {
      return mongoose;
    });
  }
  cached.connection = await cached.promise;
  return cached.connection;
};

export default connectToDatabase;
