import { createClient } from "redis";

let isRedisConnected = false;
const localBlacklist = new Set(); // Fallback in-memory blacklist for dev mode

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
  // Suppress repeated connection warnings to keep console clean
  isRedisConnected = false;
});

// Non-blocking connection sequence
redisClient
  .connect()
  .then(() => {
    isRedisConnected = true;
    console.log("Redis connected successfully for token blacklisting");
  })
  .catch(() => {
    console.warn(
      "Failed to connect to Redis. Using in-memory fallback for token blacklisting",
    );
    isRedisConnected = false;
  });

/**
 * Adds a token to the blacklist with an expiration TTL (in seconds)
 * @param {string} token - The JWT token to blacklist
 * @param {number} ttl - TTL in seconds until the token naturally expires
 */

export async function blackListToken(token, ttl) {
  if (isRedisConnected) {
    try {
      await redisClient.set(token, "blacklisted", {
        EX: ttl,
      });
    } catch (error) {
      console.error(
        "Failed to write to Redis blacklist, falling back to memory: ",
        error.message,
      );
      localBlacklist.add(token);
      setTimeout(() => localBlacklist.delete(token), ttl * 1000);
    }
  } else {
    // In-memory fallback: register and set a timer to purge once expired
    localBlacklist.add(token);
    setTimeout(() => localBlacklist.delete(token), ttl * 1000);
  }
}

/**
 * Checks if a token is registered in the blacklist
 * @param {string} token - The JWT token to check
 * @returns {Promise<boolean>}
 */
export async function isTokenBlackListed(token) {
  if (isRedisConnected) {
    try {
      const result = await redisClient.get(token);
      return result !== null;
    } catch (error) {
      console.error(
        "Failed to query Redis blacklist, falling back to memory: ",
        error.message,
      );
      return localBlacklist.has(token);
    }
  } else {
    return localBlacklist.has(token);
  }
}
