const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/get-me", authMiddleware.identifyUser, authController.getMe);

authRouter.get("/logout", authController.logoutUser);

module.exports = authRouter;
