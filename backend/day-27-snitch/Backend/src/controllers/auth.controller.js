import config from "../config/config.js";
import ApiError from "../errors/ApiError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import userModel from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

export const registerUser = asyncHandler(async (req, res) => {
  const { email, contact, password, fullname } = req.body;

  const existUser = await userModel.findOne({
    $or: [{ email }, { contact }],
  });

  if (existUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await userModel.create({
    email,
    contact,
    password,
    fullname,
  });
});
