"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";
import { OrderStatus } from "@prisma/client";
import { emit } from "process";

import { io } from "socket.io-client";

const socket = new (io as any)("http://localhost:4000");

export const handleOrder = async (
  orderStatus: OrderStatus,
  orderId: string,
) => {
  try {
    const res = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: orderStatus,
      },
    });

    socket.emit("orderStatusChanged", res, () => {
      console.log("admin event emitted socket is now disconnected");
      socket.disconnect();
    });
  } catch (e) {
    console.error(e);
  }
};
