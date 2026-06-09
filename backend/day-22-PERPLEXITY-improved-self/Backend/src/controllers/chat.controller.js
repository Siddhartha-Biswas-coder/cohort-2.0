/**
 * Chat controller for handling chat-related operations including sending messages,
 * retrieving chats, getting messages, renaming chats, and deleting chats.
 *
 * Looks up the user's socketId and kicks off the background async task that triggers ai-stream-start, ai-stream-chunk (for each chunk returned by the model), and ai-stream-end events.
 */

import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../errors/ApiError.js";
import { getUserSocket } from "../sockets/socketRegistry.js";
import * as chatService from "../services/chat.service.js";

/**
 * Sends a message, immediately returning the chat details, and streams the AI response via sockets
 * @param {Object} req - Express request object containing body (message, chat, mode) and authenticated user
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { message, chat: chatId, mode } = req.body;
  const socketId = getUserSocket(req.user.id);

  if (!socketId) {
    throw new ApiError(404, "No socket found for user");
  }

  const { chat, userMessage } = await chatService.sendMessageService({
    userId: req.user.id,
    message,
    chatId,
    mode,
    socketId,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { chat, userMessage },
        "Message sent and streaming initialized",
      ),
    );
});

/**
 * Retrieves all chats created by the authenticated user
 * @param {Object} req - Express request object containing authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const getChats = asyncHandler(async (req, res) => {
  const chats = await chatService.getChatService(req.user.id);
  res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats retrieved successfully"));
});

/**
 * Retrieves all messages in a specific chat, validating user ownership of the chat
 * @param {Object} req - Express request object containing params.chatId and authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const messages = await chatService.getMessagesService({
    chatId,
    userId: req.user.id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, messages, "message retrived successfully"));
});

/**
 * Renames a specific chat's title after validating user ownership
 * @param {Object} req - Express request object containing params.chatId, body.title, and authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} - Express response containing updated chat info
 */
export const renameChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { title } = req.body;
  const chat = await chatService.renameChatById({
    chatId,
    title,
    userId: req.user.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Chat renamed successfully"));
});

/**
 * Deletes a specific chat and all its associated messages
 * @param {Object} req - Express request object containing params.chatId and authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const deleteChat = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { chatId } = req.params;

  const chat = await chatService.deleteChatService({
    chatId,
    userId,
  });

  res.status(200).json(new ApiResponse(200, chat, "Chat deleted successfully"));
});

export const regenerateResponse = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { mode } = req.body;
  const socketId = getUserSocket(req.user.id);

  if (!socketId) {
    throw new ApiError(404, "No socket connection active");
  }

  await chatService.regenerateResponseService({
    userId: req.user.id,
    chatId,
    mode,
    socketId,
  });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Regeneration started successfully"));
});

export const togglePinChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const chat = await chatService.togglePinChatService({
    chatId,
    userId: req.user.id,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        chat,
        chat.isPinned
          ? "Chat pinned successfully"
          : "Chat unpinned successfully",
      ),
    );
});

export const generateShareLink = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const shareToken = await chatService.generateShareLinkService({
    chatId,
    userId: req.user.id,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { shareToken },
        "Share token generated successfully",
      ),
    );
});

export const getSharedChat = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const { chat, messages } = await chatService.getSharedChatService(token);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { chat, messages },
        "Shared chat retrived successfully",
      ),
    );
});
