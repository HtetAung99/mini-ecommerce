"use server";

import { redirect } from "next/navigation";
import { isAdmin, isAuthenticted } from "../../../lib/session";
import { revalidatePath } from "next/cache";
import { getExtendedPrisma } from "../../../lib/extendedPrisma";

export async function addCategory(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission) redirect("/admin/categories/?message=authFailed");

  const prisma = await getExtendedPrisma();

  await prisma.category.create({
    data: formData,
  });

  revalidatePath("/admin/categories");
}
