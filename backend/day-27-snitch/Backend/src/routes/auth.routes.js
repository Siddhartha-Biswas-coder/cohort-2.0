import { Router } from "express";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validators/auth.validator.js";
import {
  googleCallback,
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUserController);

authRouter.post("/login", validateLoginUser, loginUserController);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback,
);

export default authRouter;
