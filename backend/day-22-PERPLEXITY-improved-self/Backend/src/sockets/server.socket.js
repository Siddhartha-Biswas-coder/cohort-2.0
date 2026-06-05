import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.middleware.js";
import { addUserSocket, removeUserSocket } from "./socketRegistry.js";

let io;

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

    socket.on("disconnect", () => {
      removeUserSocket(socket.user.id);

      console.log(`
      User ${socket.user.username} disconnected`);
    });
  });
}

export function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}
