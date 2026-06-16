import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  //   GOOGLE_USER: z.string().email("GOOGLE_USER must be a valid email"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  //   GOOGLE_REFRESH_TOKEN: z.string().min(1, "GOOGLE_REFRESH_TOKEN is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  //   MISTRAL_API_KEY: z.string().optional(),
  //   GOOGLE_API_KEY: z.string().optional(),
  //   TAVILY_API_KEY: z.string().min(1, "TAVILY_API_KEY is required"),
  //   NODE_ENV: z
  //     .enum(["development", "production", "test"])
  //     .default("development"),
  //   REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
});

const envData = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || process.env.BACKEND_PORT || 3000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const parsedEnv = envSchema.safeParse(envData);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsedEnv.error.issues);
  process.exit(1);
}
export const config = parsedEnv.data;
export default config;
