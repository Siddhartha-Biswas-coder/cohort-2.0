import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 *  @route POST /api/auth/register
 *  @desc Regiter a new user
 *  @access Public
 *  @body {username, email, password}
 *  @returns {user: { id, username, email }, token }
 */

authRouter.post("/register",registerValidator,register);

export default authRouter;
