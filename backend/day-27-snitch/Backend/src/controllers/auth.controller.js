import config from "../config/config.js";
import cookieOptions from "../config/cookie.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  registerUserService,
  loginUserService,
  googleAuthService,
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

  const { user, token } = await registerUserService({
    email,
    contact,
    fullname,
    password,
    isSeller,
  });

  res.cookie("token", token, cookieOptions);

  sendResponse(201, user, res, "User Registered successfully");
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUserService({ email, password });

  res.cookie("token", token, cookieOptions);

  sendResponse(202, user, res, "User Logged-in successfully");
});

export const googleCallback = asyncHandler(async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  const { user, token } = await googleAuthService({ email, id, displayName });

  res.cookie("token", token, cookieOptions);

  res.redirect(
    config.NODE_ENV === "development"
      ? "http://localhost:5173"
      : config.CLIENT_URL,
  );
});

export const getMeController = asyncHandler(async (req, res) => {
  const user = req.user;

  sendResponse(200, user, res, "User fetched successfully");
});
