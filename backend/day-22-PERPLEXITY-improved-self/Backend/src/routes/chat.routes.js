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

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);

chatRouter.get("/", authUser, getChats);

chatRouter.get("/:chatId/messages", authUser, getMessages);

chatRouter.patch("/:chatId", authUser, renameChat);

chatRouter.delete("/delete/:chatId/", authUser, deleteChat);

chatRouter.post("/:chatId/regenerate", authUser, regenerateResponse);

chatRouter.patch("/:chatId/pin", authUser, togglePinChat);

chatRouter.post("/:chatId/share", authUser, generateShareLink);

chatRouter.get("/share/:token", getSharedChat); //Bypasses authUser middleware to remain public

export default chatRouter;
