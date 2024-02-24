"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { PermissionAddFormValue } from "../admin/users-management/@permission/addPermission/components/permission-form";

export async function addPermission(formData: PermissionAddFormValue) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    const permission = await prisma.permission.create({
      data: formData,
    });
    // if not return permission, router get stuck on modal
    revalidatePath("/admin/users-management");
    return permission;
  } catch (e) {
    throw new Error("Failed to add permission");
  }
}
