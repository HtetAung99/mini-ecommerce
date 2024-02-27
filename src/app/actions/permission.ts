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

  try {
    const permission = await prisma.permission.create({
      data: formData,
    });
  } catch (e) {
    throw new Error("Failed to add permission");
  }
  revalidatePath("/admin/users-management");
}
