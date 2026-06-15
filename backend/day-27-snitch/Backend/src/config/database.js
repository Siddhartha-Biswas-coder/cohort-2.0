import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  const mongoUri = config.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};

export default connectDB;
