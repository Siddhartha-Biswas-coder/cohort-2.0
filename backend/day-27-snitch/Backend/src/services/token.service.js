import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function generateAccessToken(userId) {
  const token = jwt.sign(
    {
      id: userId,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY,
    },
  );

  return token;
}
