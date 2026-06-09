import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../errors/ApiError.js";
import {
  registerUser,
  loginUser,
  generateAccessToken,
  getUserByIdService,
  verifyEmailService,
  logoutUser,
} from "../services/auth.service.js";
import env from "../config/env.js";

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
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
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

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await getUserByIdService(userId);

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

/**
 *  @route GET /api/auth/verify-email
 *  @desc Verify user's email address
 *  @access Public
 *  @query {token}
 */

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  try {
    await verifyEmailService(token);

    const html = `
    <h1>Email Verified Successfully</h1>
    <p>Your email has been verified. You can log in to your Account</p>
    <a href="http://localhost:5173/login">Go to login</a>
    `;

    return res.send(html);
  } catch (err) {
    throw new ApiError(400, err.message || "Invalid or expired token");
  }
});

/**
 *  @route POST /api/auth/logout
 *  @desc Logout current user by clearing token cookie
 *  @access Public
 */

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  await logoutUser(token);

  // Clear cookie from the client
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successfully"));
});
