import ApiError from "../errors/ApiError.js";
import {
  findUserByEmail,
  findUserByEmailOrContact,
  createUser,
  createUserByGoogleAuth,
} from "../repositories/user.repository.js";
import { generateAccessToken } from "./token.service.js";

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

export async function registerUserService(userData) {
  await validateUserDoesNotExist(userData.email, userData.contact);

  const user = await createUser(userData);

  const token = generateAccessToken(user._id);
  return { user, token };
}

export async function loginUserService(userData) {
  const user = await validateUser(userData.email);

  await validatePassword(user, userData.password);

  const token = generateAccessToken(user._id);
  return { user, token };
}

export async function googleAuthService(userData) {
  let user = await findUserByEmail(userData.email);

  if (!user) {
    user = await createUserByGoogleAuth(userData);
  }

  const token = generateAccessToken(user._id);
  return { user, token };
}
