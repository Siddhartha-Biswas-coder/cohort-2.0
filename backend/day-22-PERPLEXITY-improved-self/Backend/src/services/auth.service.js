import userModel from "../models/user.model.js";
import ApiError from "../errors/ApiError.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./mail.service.js";

/**
 * Register controller services
 */

export async function validateUserDoesNotExist(email, username) {
  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(400, "User with email or username already exists");
  }
}

export async function createUser({ username, email, password }) {
  const user = await userModel.create({ username, email, password });

  return user;
}

export function generateEmailVerificationToken(user) {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
}

export async function sendVerificationEmail({ user, token }) {
  await sendEmail({
    to: user.email,
    subject: "Welcome to Perplexity",
    html: `
      <p>Hi ${user.username},</p>
      <p>Thank you for registering at <strong>Perplexity</strong>.</p>
      <p>Please verify your email address by clicking the link below</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
    `,
  });
}

export async function registerUser({ username, email, password }) {
  await validateUserDoesNotExist(email, username);

  const user = await createUser({ username, email, password });

  const verificationToken = generateEmailVerificationToken(user);

  await sendVerificationEmail({ user, token: verificationToken });

  return user;
}

/**
 * Login controller services
 */

export async function findUserByEmail(email) {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  return user;
}

export async function validatePassword(user, password) {
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }
}

export function validateUserVerification(user) {
  if (!user.verified) {
    throw new ApiError(400, "Please verify your email before logging in");
  }
}

export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  await validatePassword(user, password);

  validateUserVerification(user);

  return user;
}


