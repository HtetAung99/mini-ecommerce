"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { io } from "socket.io-client";

export const assignStore = async (
  storeId: number,
  userId: string,
  isGrant: boolean,
) => {
  const socket = new (io as any)("http://localhost:4000");
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    if (isGrant) {
      await prisma.user.update({
        where: { id: userId },
        data: { storeAccesses: { push: storeId } },
      });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      await prisma.user.update({
        where: { id: userId },
        data: {
          storeAccesses: {
            set: user?.storeAccesses.filter((sa) => sa !== storeId),
          },
        },
      });
    }
    socket.emit("role-changed", { userId }, () => {
      console.log(
        `role-changed event emitted socket (${socket.id}) is now disconnected`,
      );
      socket.disconnect();
    });

    revalidatePath("/admin/users-management");
  } catch (error) {
    console.error(error);
  }
};
