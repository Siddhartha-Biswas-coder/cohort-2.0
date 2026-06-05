import userModel from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../errors/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";
import {
  loginUser,
  generateAccessToken,
  registerUser,
} from "../services/auth.service.js";

/**
 *  @route POST /api/auth/register
 *  @desc Regiter a new user
 *  @access Public
 *  @body {username, email, password}
 */

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await registerUser({ username, email, password });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      "User registered successfully",
    ),
  );
});

/**
 *  @route POST /api/auth/login
 *  @desc login an user and return jwt token
 *  @access Public
 *  @body {email, password}
 */

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  const token = generateAccessToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      "Login successful",
    ),
  );
});

/**
 *  @route GET /api/auth/get-me
 *  @desc Get current logged in user's details
 *  @access Private
 */

export async function getMe(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }

  res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user,
  });
}

/**
 *  @route GET /api/auth/verify-email
 *  @desc Verify user's email address
 *  @access Public
 *  @query {token}
 */

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;

    await user.save();

    const html = `
    <h1>Email Verified Successfully</h1>
    <p>Your email has been verified. You can log in to your Account</p>
    <a href="http://localhost:3000/login">Go to login</a>

    `;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid ot expired token",
      success: false,
      err: err.message,
    });
  }
}
