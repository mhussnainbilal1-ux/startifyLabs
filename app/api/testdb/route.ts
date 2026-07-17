import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      return NextResponse.json({
        success: false,
        stage: "environment",
        message: "MONGODB_URI is not available in Vercel.",
      });
    }

    // Import inside try so import errors are also returned as JSON
    const mongoose = (await import("mongoose")).default;

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      bufferCommands: false,
    });

    const database = mongoose.connection.db;

    if (!database) {
      throw new Error("MongoDB connected, but database is unavailable.");
    }

    // Actual database command
    const pingResult = await database.admin().ping();

    const result = {
      success: true,
      stage: "connected",
      message: "Vercel successfully connected to MongoDB.",
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
      ping: pingResult,
    };

    await mongoose.disconnect();

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown connection error";

    return NextResponse.json({
      success: false,
      stage: "connection",
      message,
    });
  }
}