import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  connection: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI || "", {
      dbName: "startify-crm",
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI!);

  isConnected = true;

  console.log("✅ MongoDB Connected");
}