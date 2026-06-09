import mongoose from "mongoose";
import env from "./env.js";

const connectToDB = async () => {
  const conn = await mongoose.connect(env.MONGODB_URI);
  console.log(`MongoDB connected : ${conn.connection.host}`);
};

export default connectToDB;
