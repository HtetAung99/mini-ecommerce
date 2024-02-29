"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { PermissionEditFormValue } from "../admin/users-management/@permission/editPermission/components/edit-form";

export async function addPermission(formData: PermissionEditFormValue) {
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

export async function editPermission(formData: PermissionEditFormValue) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  const { permissionId, ...data } = formData;

  try {
    const permission = await prisma.permission.update({
      data,
      where: { id: formData.permissionId },
    });
  } catch (e) {
    throw new Error("Failed to add permission");
  }
  revalidatePath("/admin/users-management");
}

export async function deletePermission(pid: string) {
  await prisma.permission.delete({ where: { id: pid } });
  revalidatePath("/admin/users-management");
}
