/**
 * Responsible for
 *
 * - Socket emits
 * - Stream events
 * - token streaming
 */

import { getIo } from "../sockets/server.socket.js";

export function emitStreamStart(socketId) {
  getIo().to(socketId).emit("ai-stream-start");
}

export function emitStreamChunk(socketId, chunk) {
  getIo().to(socketId).emit("ai-stream-chunk", chunk);
}

export function emitStreamEnd(socketId) {
  getIo().to(socketId).emit("ai-stream-end");
}
