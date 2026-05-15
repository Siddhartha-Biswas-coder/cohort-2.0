const express = require("express");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();

/**
 * /api/auth/register
 */

/**
 * controller
 */

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist with the same email address",
    });
  }

  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    email,
    password: hashPassword,
    name,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered",
    user,
    token,
  });
});

/**
 * /api/auth/protected
 */

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
});

/**
 * /api/auth/login
 */

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email address",
    });
  }

  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  const isPassWordMatched = user.password === hashPassword;

  if (!isPassWordMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User successfully logged in",
    user,
  });
});

module.exports = authRouter;
