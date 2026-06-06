/**
 * Configures the client-side socket connection to the server and handles low-level event listeners for ai-stream-* events.
 */
import { io } from "socket.io-client";

let socket;

export const intitalizeSocketConnection = () => {
  if (socket) return socket;

  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;

export const registerSocketEvents = ({
  onStreamStart,
  onStreamChunk,
  onStreamEnd,
}) => {
  if (!socket) return;

  socket.off("ai-stream-start");
  socket.off("ai-stream-chunk");
  socket.off("ai-stream-end");

  socket.on("ai-stream-start", onStreamStart);

  socket.on("ai-stream-chunk", onStreamChunk);

  socket.on("ai-stream-end", onStreamEnd);
};

export const emitTestStream = () => {
  if (!socket) return;

  socket.emit("test-stream");
};
