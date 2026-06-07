/**
 * Chat controller for handling chat-related operations including sending messages,
 * retrieving chats, getting messages, renaming chats, and deleting chats.
 *
 * Looks up the user's socketId and kicks off the background async task that triggers ai-stream-start, ai-stream-chunk (for each chunk returned by the model), and ai-stream-end events.
 */

import {
  generateResponse,
  generateChatTitle,
  SEARCH_PROMPT,
  RESEARCH_PROMPT,
} from "../services/ai.service.js";
import { renameChatById } from "../services/chat.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import ApiError from "../errors/ApiError.js";
import { getIo } from "../sockets/server.socket.js";
import { getUserSocket } from "../sockets/socketRegistry.js";
import { streamResponse } from "../services/ai.stream.service.js";
import { activeStreams } from "../services/streamRegistry.service.js";

/**
 * Sends a message, immediately returning the chat details, and streams the AI response via sockets
 * @param {Object} req - Express request object containing body (message, chat, mode) and authenticated user
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { message, chat: chatId, mode } = req.body;

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

  const io = getIo();
  const socketId = getUserSocket(req.user.id);

  if (!socketId) {
    throw new ApiError(404, "No socket found for user");
  }

  // Respond immediately with the chat and userMessage details
  res.status(201).json({
    chat,
    userMessage,
  });

  // Run the AI streaming and AI message persistence asynchronously
  (async () => {
    try {
      const messages = await messageModel
        .find({ chat: chatId || chat._id })
        .sort({ createdAt: 1 });

      let finalContent = "";
      let streamedSources = [];

      io.to(socketId).emit("ai-stream-start", { chatId: chat._id });

      finalContent = await streamResponse({
        messages,
        systemPrompt: mode === "search" ? SEARCH_PROMPT : RESEARCH_PROMPT,
        onChunk: (chunk) => {
          io.to(socketId).emit("ai-stream-chunk", {
            chatId: chat._id,
            chunk,
          });
        },
        onSources: (sources) => {
          streamedSources = sources;
          // Option: you could also emit a separate event "ai-stream-sources" here if desired
        },
      });
      finalContent = result.content;
      streamedSources = result.sources;

      // Send sources to the client at the end of the stream
      io.to(socketId).emit("ai-stream-end", {
        chatId: chat._id,
        sources: streamedSources,
      });

      await messageModel.create({
        chat: chatId || chat._id,
        content: finalContent,
        role: "ai",
        sources: streamedSources,
        // Save the actual search sources!
      });
    } catch (error) {
      console.error("Error generating and streaming AI response:", error);
    }
  })();

  // Run streaming asynchronously
  (async () => {
    // Instantiate an AbortController for this streaming task
    const controller = new AbortController();
    activeStreams.set(socketId, controller);

    try {
      const messages = await messageModel
        .find({ chat: chatId || chat._id })
        .sort({ createdAt: 1 });
      let finalContent = "";
      let sourcesList = [];

      io.to(socketId).emit("ai-stream-start", { chatId: chat._id });

      const streamResult = await streamResponse({
        message,
        systemPrompt: mode === "search" ? SEARCH_PROMPT : RESEARCH_PROMPT,
        signal: controller.signal,
        onChunk: (chunk) => {
          io.to(socketId).emit("ai-stream-chunk", { chatId: chat._id, chunk });
        },
        onSources: (sources) => {
          sourcesList = sources;
          io.to(socketId, "ai-stream-sources", { chatId: chat._id, sources });
        },
      });

      io.to(socketId).emit("ai-stream-end", { chatId: chat._id });

      await messageModel.create({
        chat: chatId || chat._id,
        content: streamResult.content,
        role: "ai",
        sources: sourcesList,
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("STream absorted successfully");
      } else {
        console.log("Stream generation failed: ", error.message);
      }
    } finally {
      activeStreams.delete(socketId);
    }
  })();
});

/**
 * Retrieves all chats created by the authenticated user
 * @param {Object} req - Express request object containing authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const getChats = asyncHandler(async (req, res) => {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats retrived successfully"));
});

/**
 * Retrieves all messages in a specific chat, validating user ownership of the chat
 * @param {Object} req - Express request object containing params.chatId and authenticated user info
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
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

  const chat = await renameChatById({
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

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: userId,
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  res.status(200).json(new ApiResponse(200, chat, "Chat deleted successfully"));
});

export const regenerateResponse = asyncHandler(async(req,res) => {
  const {chatId} =req.params;
  // 1. Verify ownership of the target chat

  const chat = await chatModel.findOne({_id: chatId,user:req.user.id})

  if(!chat){
    throw ApiError(404,"Chat not found")
  }

   // 2. Locate and delete the last AI message in this conversation
   const lastMessage = await messageModel.findOne({chatId : chatId}).sort({createdAt : -1})

   if(lastMessage && lastMessage.role === "ai"){
    messageModel.findByIdAndDelete(lastMessage._id)
   }
})
