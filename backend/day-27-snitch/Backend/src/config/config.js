import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1, "ImageKit priavate key is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RAZOR_PAY_API_KEY_ID: z.string().min(1, "RazorPay API Key ID is required"),
  RAZOR_PAY_KEY_SECRET: z.string().min(1, "RazorPay Key Secret is required"),
});

const envData = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || process.env.BACKEND_PORT || 3000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  RAZOR_PAY_API_KEY_ID: process.env.RAZOR_PAY_API_KEY_ID,
  RAZOR_PAY_KEY_SECRET: process.env.RAZOR_PAY_KEY_SECRET,
};

const parsedEnv = envSchema.safeParse(envData);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsedEnv.error.issues);
  process.exit(1);
}
export const config = parsedEnv.data;
export default config;
