import ApiError from "../errors/ApiError.js";
import { verifyAccessToken } from "../services/auth.service.js";
import asyncHandler from "./asyncHandler.js";
import { isTokenBlackListed } from "../services/redis.service.js";

/**
 * Express middleware to authenticate users using JWT cookies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function callback
 * @returns {Promise<void>}
 */
export const authUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  // 1. Check if token is blacklisted (logged out)
  const isBlacklisted = await isTokenBlackListed(token);
  if (isBlacklisted) {
    throw new ApiError(401, "Session has expired, please login again");
  }

  // 2. Proceed with normal access token signature & expiration check

  const decoded = verifyAccessToken(token);

  req.user = decoded;

  next();
});
