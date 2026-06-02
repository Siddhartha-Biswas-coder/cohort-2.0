import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
  renameChat,
} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);

chatRouter.get("/", authUser, getChats);

chatRouter.get("/:chatId/messages", authUser, getMessages);

chatRouter.patch("/:chatId", authUser, renameChat);

chatRouter.delete("/delete/:chatId/", authUser, deleteChat);

export default chatRouter;
