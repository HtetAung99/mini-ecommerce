"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

import { io } from "socket.io-client";

const socket = new (io as any)("http://localhost:4000");

export async function editRole(userId: string, role: Role) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    socket.emit("role-changed", { userId }, () => {
      console.log("admin event emitted socket is now disconnected");
      socket.disconnect();
    });

    revalidatePath("/admin/users-management");
  } catch (e) {
    console.error(e);
  }
}

export async function deleteRole(roleId: string) {
  await prisma.permissionRole.delete({ where: { id: roleId } });
  revalidatePath("/admin/users-management");
}
