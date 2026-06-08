import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getMe,
  login,
  register,
  verifyEmail,
  logout,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 *  @route POST /api/auth/register
 *  @desc Regiter a new user
 *  @access Public
 *  @body {username, email, password}
 */

authRouter.post("/register", registerValidator, register);

/**
 *  @route POST /api/auth/login
 *  @desc login an user and return jwt token
 *  @access Public
 *  @body {email, password}
 */

authRouter.post("/login", loginValidator, login);

/**
 *  @route POST /api/auth/logout
 *  @desc Logout current user and clear token cookie
 *  @access Public
 */
authRouter.post("/logout", logout);

/**
 *  @route GET /api/auth/get-me
 *  @desc Get current logged in user's details
 *  @access Private
 */

authRouter.get("/get-me", authUser, getMe);

/**
 *  @route GET /api/auth/verify-email
 *  @desc Verify user's email address
 *  @access Public
 *  @query {token}
 */

authRouter.get("/verify-email", verifyEmail);

export default authRouter;
