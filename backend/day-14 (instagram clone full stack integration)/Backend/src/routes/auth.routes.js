const express = require("express");
const authController = require("../controllers/auth.controller.js");
const identifyUser = require("../middlewares/auth.middleware.js");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 */
authRouter.post("/register", authController.registerController);

/**
 * @route POST /api/auth/login
 */
authRouter.post("/login", authController.loginController);

/**
 * @route GET /api/auth/get-me
 * @description Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
