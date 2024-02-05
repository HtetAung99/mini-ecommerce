import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";

import { Server } from "socket.io";

export async function GET(request: NextRequest, response: NextApiResponse) {
  if (!(response.socket as any)?.server?.io) {
    console.log("Setting up Socket.IO");

    const io = new Server((response.socket as any).server);

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    (response.socket as any).server.io = io;
  } else {
    console.log("socket.io already running");
  }

  return response.end();
}
