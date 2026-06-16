import asyncHandler from "../middlewares/asyncHandler.js";
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
  const user = await registerUserService({
    email,
    contact,
    fullname,
    password,
    isSeller,
  }, res);
  sendResponse(201, user, res, "User Registered successfully");
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password }, res);
  sendResponse(202, user, res, "User Logged-in successfully");
});
