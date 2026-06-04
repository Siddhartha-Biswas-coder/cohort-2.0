import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { renameChatById } from "../services/chat.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import ApiError from "../errors/ApiError.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message, chat: chatId } = req.body;

  let title = null,
    chat = await chatModel.findOne({ _id: chatId, user: req.user.id });

  if (chatId && !chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chatId) {
    title = await generateChatTitle(message);

    chat = await chatModel.create({
      user: req.user.id,
      title: title,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id });

  const result = await generateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result.content,
    role: "ai",
    sources: result.sources,
  });

  res.status(201).json({
    chat,
    userMessage,
    aiMessage,
    sources: result.sources,
  });
});

export const getChats = asyncHandler(async (req, res) => {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(200).json(new ApiResponse(200, chats, "Chats retrived successfully"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json(new ApiResponse(200, messages, "message retrived successfully"));
});

export const renameChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { title } = req.body;

  const chat = await renameChatById({
    chatId,
    title,
    userId: req.user.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Chat renamed successfully"));
});

export const deleteChat = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { chatId } = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: userId,
  });

  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  res.status(200).json(new ApiResponse(200, chat, "Chat deleted successfully"));
});
