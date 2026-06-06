import { verifyAccessToken } from "../services/auth.service.js";
import asyncHandler from "./asyncHandler.js";

/**
 * Express middleware to authenticate users using JWT cookies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function callback
 * @returns {Promise<void>}
 */
export const authUser = asyncHandler(async (req, res, next) => {
  const decoded = verifyAccessToken(req.cookies.token);

  req.user = decoded;

  next();
});
