"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";
import { io } from "socket.io-client";

export const activateUser = async (userId: string, status: boolean) => {
  const socket = new (io as any)("http://localhost:4000");
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { active: status },
    });
    socket.emit("role-changed", { userId }, () => {
      console.log(
        `role-changed event emitted socket (${socket.id}) is now disconnected`,
      );
      socket.disconnect();
    });
  } catch (e: any) {
    throw new Error(e);
  }

  revalidatePath("/admin/users-management/users");
};
