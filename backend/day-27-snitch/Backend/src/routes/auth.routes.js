import { Router } from "express";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validators/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUser);

authRouter.post("/login", validateLoginUser, loginUser);

export default authRouter;
