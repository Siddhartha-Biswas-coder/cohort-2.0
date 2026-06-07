/**
 * Manages the Socket.io server instance and handles real-time events like user connections,
 * disconnections, and AI response streaming.
 */

import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.middleware.js";
import { addUserSocket, removeUserSocket } from "./socketRegistry.js";
import { activeStreams } from "../services/streamRegistry.service.js";

let io;

/**
 * Initializes the Socket.io server and defines event handlers for connections/disconnections
 * @param {Object} httpServer - The Node.js HTTP server instance to attach socket server to
 * @returns {void}
 */
export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  console.log("Socket.io server is running");

  io.on("connection", (socket) => {
    console.log(`User ${socket.user.username} connected`);

    addUserSocket(socket.user.id, socket.id);

    socket.on("test-stream", () => {
      socket.emit("ai-stream-start");

      const words = ["Redis ", "is ", "an ", "in-memory ", "database."];

      let index = 0;

      const interval = setInterval(() => {
        if (index >= words.length) {
          clearInterval(interval);

          socket.emit("ai-stream-end");

          return;
        }

        socket.emit("ai-stream-chunk", words[index]);

        index++;
      }, 500);
    });

    // --- SPRINT 1: LISTEN FOR USER CANCEL REQUESTS ---
    socket.on("ai-stream-abort", () => {
      // 1. Fetch the active abort controller for the socket session
      const controller = activeStreams.get(socket.id);

      // 2. If a controller exists, call .abort() to signal LangChain to stop token streaming
      if (controller) {
        controller.abort();

        // 3. Clean up the registry
        activeStreams.delete(socket.id);

        console.log(`Stream aborted for socket ${socket.id}`);
      }
    });

    socket.on("disconnect", () => {
      removeUserSocket(socket.user.id);

      console.log(`
      User ${socket.user.username} disconnected`);
    });
  });
}

/**
 * Returns the initialized Socket.io server instance
 * @returns {Object} - The active Socket.io Server instance
 * @throws {Error} - Throws an error if Socket.io server has not been initialized
 */
export function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}
