import { verifyAccessToken } from "../services/auth.service.js";
import asyncHandler from "./asyncHandler.js";

export const authUser = asyncHandler(async (req, res, next) => {
  const decoded = verifyAccessToken(req.cookies.token);

  req.user = decoded;

  next();
});
