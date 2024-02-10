import { Server } from "socket.io";

import { createServer, get } from "http";

const httpServer = createServer();
let ioInstance = null;

const getIo = () => {
  if (!ioInstance) {
    ioInstance = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    const PORT = 4000;
    httpServer.listen(PORT, () => {
      console.log(`Socket.io server is running on port ${PORT}`);
    });
  }
  return ioInstance;
};

getIo();

ioInstance.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("admin", (data, callback) => {
    console.log(socket.id, "has emitted admin event and server received it.");
    socket.broadcast.emit("admin", data);
    callback();
  });

  socket.on("order", (data, callback) => {
    console.log(socket.id, "has emitted order event and server received it.");
    socket.broadcast.emit("order", data);
    callback();
  });

  socket.on("orderStatusChanged", (data, callback) => {
    console.log(socket.id, "has emitted order event and server received it.");
    socket.broadcast.emit("orderStatusChanged", data);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

export default getIo;
