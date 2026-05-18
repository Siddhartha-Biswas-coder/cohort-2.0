const express = require("express");
const authController = require("../controllers/auth.controller.js");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 */
authRouter.post("/register", authController.registerController);

/**
 * @route POST /api/auth/login
 */
authRouter.post("/login", authController.loginController);
module.exports = authRouter;
