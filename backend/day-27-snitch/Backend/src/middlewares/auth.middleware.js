import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../errors/ApiError.js";
import asyncHandler from "./asyncHandler.js";
import { findUserById } from "../repositories/user.repository.js";

export const authenticateUser = asyncHandler(async(req,res,next) => {
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

    req.user = user;

    next();
})

export const authenticateSeller = asyncHandler(async (req, res, next) => {
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

  if (user.role !== "seller") {
    throw new ApiError(
      401,
      "You do not have permission to access this resource",
    );
  }

  req.user = user;

  next();
});

// export const authenticateRole = (...roles) => {
//   (req, res, next) => {
//     if (!req.user) {
//       throw new ApiError(401, "Unauthorized access");
//     }

//     if (!roles.includes(req.user.roles)) {
//       throw new ApiError(
//         "You do not have the pemission to acess this resource",
//       );
//     }
//     next();
//   };
// };
