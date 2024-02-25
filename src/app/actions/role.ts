"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

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
    revalidatePath("/admin/users-management");
  } catch (e) {
    console.error(e);
  }
}
