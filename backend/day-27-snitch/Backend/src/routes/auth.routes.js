import { Router } from "express";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validators/auth.validator.js";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUserController);

authRouter.post("/login", validateLoginUser, loginUserController);

export default authRouter;
