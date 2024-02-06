import { Server } from "socket.io";

import { createServer } from "http";

const httpServer = createServer();

let ioInstance;

export const getIo = () => {
  if (!ioInstance) {
    ioInstance = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
  }
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
  });
  return ioInstance;
};

// ioInstance.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("admin", (data) => {
//     ioInstance.emit("admin", data);
//     console.log("object", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });
