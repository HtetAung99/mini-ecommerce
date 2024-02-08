import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { io as ClientIO } from "socket.io-client";
const socketInstance = new (ClientIO as any)(
  process.env.NEXT_PUBLIC_SITE_URL!,
  {
    path: "/api/socket/io",
    addTrailingSlash: false,
  },
);
const productHandler = (req: NextRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("get");
    socketInstance.on("connect", () => {
      console.log("connect from product");
    });
  }

  res.end();
};

export default productHandler;
