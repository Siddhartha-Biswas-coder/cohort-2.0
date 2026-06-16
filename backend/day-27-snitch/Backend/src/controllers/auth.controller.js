import config from "../config/config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

function sendResponse(statusCode, user, res, message) {
  res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      {
        user: {
          id: user.id,
          email: user.email,
          contact: user.contact,
          fullname: user.fullname,
          role: user.role,
        },
      },
      message,
    ),
  );
}

export const registerUserController = asyncHandler(async (req, res) => {
  const { email, contact, fullname, password, isSeller } = req.body;
  const user = await registerUserService(
    {
      email,
      contact,
      fullname,
      password,
      isSeller,
    },
    res,
  );
  sendResponse(201, user, res, "User Registered successfully");
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password }, res);
  sendResponse(202, user, res, "User Logged-in successfully");
});

export const googleCallback = asyncHandler(async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  let user = await userModel.findOne({
    email,
  });

  if (!user) {
    user = await userModel.create({
      email,
      googleId: id,
      fullname: displayName,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token",token)

  res.redirect("http://localhost:5173/");
});
