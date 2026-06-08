import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  GOOGLE_USER: z.string().email("GOOGLE_USER must be a valid email"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  GOOGLE_REFRESH_TOKEN: z.string().min(1, "GOOGLE_REFRESH_TOKEN is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  MISTRAL_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional,
  TAVILY_API_KEY: z.string().min(1, "TAVILY_API_KEY is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
});

const envData = {
  PORT: process.env.PORT || process.env.BACKEND_PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_USER: process.env.GOOGLE_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  TAVILY_API_KEY: process.env.TAVILY_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_URL: process.env.REDIS_URL,
};

const parsedEnv = envSchema.safeParse(envData);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}
export const env = parsedEnv.data;
export default env;