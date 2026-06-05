import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  console.log("Socket.io server is running");

  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

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
  });
}

export function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}
