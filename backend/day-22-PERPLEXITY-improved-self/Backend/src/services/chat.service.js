import chatModel from "../models/chat.model.js";
import ApiError from "../errors/ApiError.js";
import * as chatRepo from "../repositories/chat.repository.js";
import * as messageRepo from "../repositories/message.repository.js";
import {
  generateChatTitle,
  SEARCH_PROMPT,
  RESEARCH_PROMPT,
} from "./ai.service.js";
import { streamResponse } from "./ai.stream.service.js";
import { activeStreams } from "./streamRegistry.service.js";
import { getIo } from "../sockets/server.socket.js";
import { logger } from "../utils/logger.js";
import crypto from "crypto";

/**
 * Renames a chat by its ID after validating ownership and title validity
 * @param {Object} params - The parameters object
 * @param {string} params.chatId - The ID of the chat to rename
 * @param {string} params.title - The new title for the chat
 * @param {string} params.userId - The ID of the user owning the chat
 * @returns {Promise<Object>} - The updated chat document
 */
export async function renameChatById({ chatId, title, userId }) {
  const chat = await chatRepo.findChatById(chatId, userId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Chat title is required");
  }

  chat.title = title;

  await chat.save();

  return chat;
}

export async function sendMessageService({
  userId,
  message,
  chatId,
  mode,
  socketId,
}) {
  let title = null;
  let chat = null;

  if (chatId) {
    chat = await chatRepo.findChatById(chatId, userId);
    if (!chat) throw new ApiError(404, "Chat not found");
  } else {
    title = await generateChatTitle(message);
    chat = await chatRepo.createChat({ user: userId, title });
  }

  const userMessage = await messageRepo.createMessage({
    chat: chat._id,
    content: message,
    role: "user",
  });

  (async () => {
    const io = getIo();
    const controller = new AbortController();
    activeStreams.set(socketId, controller);

    try {
      const messages = await messageRepo.findMessagesByChatId(chat._id);
      let sourcesList = [];

      io.to(socketId).emit("ai-stream-start", { chatId: chat._id });

      const finalResult = await streamResponse({
        messages,
        systemPrompt: mode === "search" ? SEARCH_PROMPT : RESEARCH_PROMPT,
        signal: controller.signal,
        onChunk: (chunk) => {
          io.to(socketId).emit("ai-stream-chunk", {
            chatId: chat._id,
            chunk,
          });
        },
        onSources: (sources) => {
          sourcesList = sources;
          io.to(socketId).emit("ai-stream-sources", {
            chatId: chat._id,
            sources,
          });
        },
      });

      io.to(socketId).emit("ai-stream-end", {
        chatId: chat._id,
        sources: sourcesList,
      });

      await messageRepo.createMessage({
        chat: chat._id,
        content: finalResult.content,
        role: "ai",
        sources: sourcesList,
      });
    } catch (error) {
      if (error.name === "AbortError") {
        logger.info("Stream aborted successfully");
      } else {
        logger.error("Stream generation failed:", error.message);
      }
    } finally {
      activeStreams.delete(socketId);
    }
  })();

  return { chat, userMessage };
}

export async function regenerateResponseService({
  userId,
  chatId,
  mode,
  socketId,
}) {
  const chat = await chatRepo.findChatById(chatId, userId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const lastMessage = await messageRepo.findLastMessage(chatId);
  if (lastMessage && lastMessage.role === "ai") {
    await messageRepo.deleteMessageById(lastMessage._id);
  }

  (async () => {
    const io = getIo();
    const controller = new AbortController();
    activeStreams.set(socketId, controller);

    try {
      const messages = await messageRepo.findMessagesByChatId(chatId);
      let sourcesList = [];

      io.to(socketId).emit("ai-stream-start", { chatId: chat._id });

      const streamResult = await streamResponse({
        messages,
        systemPrompt: mode === "search" ? SEARCH_PROMPT : RESEARCH_PROMPT,
        signal: controller.signal,
        onChunk: (chunk) => {
          io.to(socketId).emit("ai-stream-chunk", {
            chatId: chat._id,
            chunk,
          });
        },
        onSources: (sources) => {
          sourcesList = sources;
          io.to(socketId).emit("ai-stream-sources", {
            chatId: chat._id,
            sources,
          });
        },
      });

      io.to(socketId).emit("ai-stream-end", {
        chatId: chat._id,
        sources: sourcesList,
      });

      await messageRepo.createMessage({
        chat: chatId,
        content: streamResult.content,
        role: "ai",
        sources: sourcesList,
      });
    } catch (error) {
      logger.error("Regeneration stream failed: ", error.message);
    } finally {
      activeStreams.delete(socketId);
    }
  })();
}

export async function getChatService(userId) {
  return chatRepo.findChatsByUserId(userId);
}

export async function getMessagesService({ chatId, userId }) {
  const chat = await chatRepo.findChatById(chatId, userId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  return await messageRepo.findMessagesByChatId(chatId);
}

export async function deleteChatService({ chatId, userId }) {
  const chat = await chatRepo.deleteChatById(chatId, userId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  return chat;
}

export async function togglePinChatService({ chatId, userId }) {
  const chat = await chatRepo.findChatById(chatId, userId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  chat.isPinned = !chat.isPinned;
  await chat.save();
  return chat;
}

export async function generateShareLinkService({ chatId, userId }) {
  const chat = await chatRepo.findChatById(chatId, userId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.shareToken) {
    chat.shareToken = crypto.randomBytes(16).toString("hex");
    chat.isShared = true;
    await chat.save();
  }

  return chat.shareToken;
}

export async function getSharedChatService(token) {
  const chat = await chatRepo.findChatByShareToken(token);
  if (!chat) {
    throw new ApiError(404, "Shared chat not found or link has expired");
  }

  const messages = await messageRepo.findMessagesByChatId(chat._id);
  return { chat, messages };
}
