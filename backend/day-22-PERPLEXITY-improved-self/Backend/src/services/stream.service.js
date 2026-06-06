/**
 * Responsible for
 *
 * - Socket emits
 * - Stream events
 * - token streaming
 */

import { getIo } from "../sockets/server.socket.js";

/**
 * Emits the ai-stream-start socket event to a specific client
 * @param {string} socketId - The target client's socket ID
 */
export function emitStreamStart(socketId) {
  getIo().to(socketId).emit("ai-stream-start");
}

/**
 * Emits a chunk of stream content to a specific client
 * @param {string} socketId - The target client's socket ID
 * @param {string} chunk - The stream text chunk
 */
export function emitStreamChunk(socketId, chunk) {
  getIo().to(socketId).emit("ai-stream-chunk", chunk);
}

/**
 * Emits the ai-stream-end socket event to a specific client
 * @param {string} socketId - The target client's socket ID
 */
export function emitStreamEnd(socketId) {
  getIo().to(socketId).emit("ai-stream-end");
}
