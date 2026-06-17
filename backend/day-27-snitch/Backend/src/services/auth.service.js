import ApiError from "../errors/ApiError.js";
import {
  findUserById,
  findUserByEmail,
  findUserByEmailOrContact,
  createUser,
  createUserByGoogleAuth,
} from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

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

  res.cookie("token", token);
}

async function validateUserDoesNotExist(email, contact) {
  const existingUser = await findUserByEmailOrContact(email, contact);

  if (existingUser) {
    throw new ApiError(400, "User already exist");
  }
}

async function validateUser(email) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  return user;
}

async function validatePassword(user, password) {
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(400, "invalid credentials");
  }
}

export async function registerUserService(userData, res) {
  await validateUserDoesNotExist(userData.email, userData.contact);

  const user = await createUser(userData);

  await sendTokenResponse(user, res);
  return user;
}

export async function loginUserService(userData, res) {
  const user = await validateUser(userData.email);

  await validatePassword(user, userData.password);

  await sendTokenResponse(user, res);
  return user;
}

export async function googleAuthService(userData, res) {
  let user = await findUserByEmail(userData.email);

  if (!user) {
    user = await createUserByGoogleAuth(userData);
  }

  await sendTokenResponse(user, res);
  return user;
}
