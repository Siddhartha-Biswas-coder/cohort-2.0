import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../errors/ApiError.js";
import asyncHandler from "./asyncHandler.js";
import { findUserById } from "../repositories/user.repository.js";

// ─── Private helper ──────────────────────────────────────────────────────────
// Responsible for: reading the cookie, verifying the JWT, and loading the user.
// Not exported — only the two middleware functions below are part of the public API.
async function verifyTokenAndGetUser(req) {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized access");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await findUserById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  return user;
}

// ─── Authenticate any logged-in user ────────────────────────────────────────
export const authenticateUser = asyncHandler(async (req, res, next) => {
  req.user = await verifyTokenAndGetUser(req);
  next();
});

// ─── Authenticate seller only ────────────────────────────────────────────────
export const authenticateSeller = asyncHandler(async (req, res, next) => {
  const user = await verifyTokenAndGetUser(req);

  if (user.role !== "seller") {
    // FIX: 403 Forbidden is correct here — 401 means "not authenticated",
    // 403 means "authenticated but not authorized"
    throw new ApiError(403, "You do not have permission to access this resource");
  }

  req.user = user;
  next();
});
