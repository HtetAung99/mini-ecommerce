"use server";

import { PermissionRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const addPermissionRole = async (
  roleId: string,
  userId: string,
  isGrant: boolean,
) => {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    if (isGrant) {
      const data = await prisma.user.update({
        where: { id: userId },
        data: { permissionRoles: { connect: { id: roleId } } },
      });
    } else {
      const data = await prisma.user.update({
        where: { id: userId },
        data: { permissionRoles: { disconnect: { id: roleId } } },
      });
    }
    revalidatePath("/admin/users-management");
  } catch (error) {
    console.error(error);
  }
};
