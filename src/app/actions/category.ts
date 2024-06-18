"use server";

import { redirect } from "next/navigation";
import { isAdmin, isAuthenticted, isSuperAdmin } from "../../../lib/session";
import { revalidatePath } from "next/cache";
import { getExtendedPrisma } from "../../../lib/extendedPrisma";

export async function addCategory(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  // TODO: Need to fix this (authorizer issue)
  const hasPermission: boolean = await isSuperAdmin();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission) redirect("/admin/categories/?message=authFailed");

  const prisma = await getExtendedPrisma();

  await prisma.category.create({
    data: formData,
  });

  revalidatePath("/admin/categories");
}

export async function editCategory(catId: number, newName: string) {
  const prisma = await getExtendedPrisma();

  await prisma.category.update({
    where: {
      id: catId,
    },
    data: {
      name: newName,
    },
  });
  revalidatePath("/admin/categories");
}
