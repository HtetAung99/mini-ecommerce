import { NextApiResponseServerIo } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextRequest,
  res: NextApiResponseServerIo,
) {
  res.socket.server.io.emit("message", "lee yay");
  //   return res.status(200).end();
  res.end();
}
