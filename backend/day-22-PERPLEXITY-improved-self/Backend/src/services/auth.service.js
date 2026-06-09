import {
  findUserById,
  findUserByEmail as findUserByEmailRepo,
  findUserByUsernameOrEmail,
  createUser as createUserRepo,
} from "../repositories/user.repository.js";
import ApiError from "../errors/ApiError.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./mail.service.js";
import env from "../config/env.js";
import { blackListToken } from "./redis.service.js";

/**
 * Register controller services
 */

/**
 * Checks if a user already exists with the given email or username
 * @param {string} email - The email to check
 * @param {string} username - The username to check
 * @throws {ApiError} - Throws a 400 Bad Request error if a user exists
 */
export async function validateUserDoesNotExist(email, username) {
  const existingUser = await findUserByUsernameOrEmail(username, email);

  if (existingUser) {
    throw new ApiError(400, "User with email or username already exists");
  }
}

/**
 * Creates a new user document in the database
 * @param {Object} params - The user parameters object
 * @param {string} params.username - The user's username
 * @param {string} params.email - The user's email
 * @param {string} params.password - The user's password (unhashed; hashed in pre-save hook)
 * @returns {Promise<Object>} - The created user document
 */
export async function createUser({ username, email, password }) {
  const user = await createUserRepo({ username, email, password });

  return user;
}

/**
 * Generates an email verification token containing the user's email
 * @param {Object} user - The user document
 * @returns {string} - The signed JWT token string
 */
export function generateEmailVerificationToken(user) {
  return jwt.sign(
    {
      email: user.email,
    },
    env.JWT_SECRET,
  );
}

/**
 * Sends a welcome/verification email to the user
 * @param {Object} params - The parameters object
 * @param {Object} params.user - The user document
 * @param {string} params.token - The verification token
 * @returns {Promise<void>}
 */
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

/**
 * Registers a new user, generating verification token and sending the verification email
 * @param {Object} params - The registration parameters
 * @param {string} params.username - The user's username
 * @param {string} params.email - The user's email
 * @param {string} params.password - The user's password
 * @returns {Promise<Object>} - The registered user document
 */
export async function registerUser({ username, email, password }) {
  await validateUserDoesNotExist(email, username);

  const user = await createUser({ username, email, password });

  const verificationToken = generateEmailVerificationToken(user);

  await sendVerificationEmail({ user, token: verificationToken });

  return user;
}

/**
 * Verifies an access token and returns the decoded payload
 * @param {string} token - The access token JWT string
 * @returns {Object} - The decoded JWT payload
 * @throws {ApiError} - Throws 401 Unauthorized if token is missing or invalid
 */
export function verifyAccessToken(token) {
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  return jwt.verify(token, env.JWT_SECRET);
}

/**
 * Login controller services
 */

/**
 * Finds a user by their email address
 * @param {string} email - The email to search for
 * @returns {Promise<Object>} - The user document
 * @throws {ApiError} - Throws 400 Bad Request if user is not found
 */
export async function findUserByEmail(email) {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  return user;
}

/**
 * Validates if the provided password matches the user's password
 * @param {Object} user - The user document
 * @param {string} password - The password candidate string
 * @returns {Promise<void>}
 * @throws {ApiError} - Throws 400 Bad Request if passwords do not match
 */
export async function validatePassword(user, password) {
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }
}

/**
 * Validates if the user's email has been verified
 * @param {Object} user - The user document
 * @throws {ApiError} - Throws 400 Bad Request if user is not verified
 */
export function validateUserVerification(user) {
  if (!user.verified) {
    throw new ApiError(400, "Please verify your email before logging in");
  }
}

/**
 * Generates an access token JWT for the user session
 * @param {Object} user - The user document
 * @returns {string} - The signed JWT token string
 */
export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

/**
 * Validates login credentials and returns the verified user
 * @param {string} email - The email to log in with
 * @param {string} password - The password string
 * @returns {Promise<Object>} - The logged in user document
 */
export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  await validatePassword(user, password);

  validateUserVerification(user);

  return user;
}
/**
 * Retrieves user details by ID, excluding password
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The user document
 */
export async function getUserByIdService(userId) {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
}

/**
 * Verifies email verification token and marks user as verified
 * @param {string} token - The email verification token
 * @returns {Promise<Object>} - The verified user document
 */
export async function verifyEmailService(token) {
  if (!token) {
    throw new ApiError(400, "Token is required");
  }
  const decoded = jwt.verify(token, env.JWT_SECRET);
  const user = await findUserByEmailRepo(decoded.email);
  if (!user) {
    throw new ApiError(400, "No user found with the provided email");
  }
  user.verified = true;
  await user.save();
  return user;
}

/**
 * Decodes the user JWT and blacklists it if active
 * @param {string} token - The session JWT
 * @returns {Promise<void>}
 */
export async function logoutUser(token) {
  if (!token) return;
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      const now = Math.floor(Date.now() / 1000);
      const ttl = decoded.exp - now;
      if (ttl > 0) {
        await blackListToken(token, ttl);
      }
    }
  } catch (error) {
    console.error("Failed to decode token for blacklist : ", error.message);
  }
}
