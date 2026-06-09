import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
  renameChat,
  regenerateResponse,
  togglePinChat,
  generateShareLink,
  getSharedChat,
} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  sendMessageValidator,
  renameChatValidator,
  chatIdParamValidator,
  regenerateValidator,
} from "../validators/chat.validator.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessageValidator, sendMessage);

chatRouter.get("/", authUser, getChats);

chatRouter.get(
  "/:chatId/messages",
  authUser,
  chatIdParamValidator,
  getMessages,
);

chatRouter.patch("/:chatId", authUser, renameChatValidator, renameChat);

chatRouter.delete(
  "/delete/:chatId/",
  authUser,
  chatIdParamValidator,
  deleteChat,
);

chatRouter.post(
  "/:chatId/regenerate",
  authUser,
  regenerateValidator,
  regenerateResponse,
);

chatRouter.patch("/:chatId/pin", authUser, chatIdParamValidator, togglePinChat);

chatRouter.post(
  "/:chatId/share",
  authUser,
  chatIdParamValidator,
  generateShareLink,
);

chatRouter.get("/share/:token", getSharedChat); //Bypasses authUser middleware to remain public

export default chatRouter;
