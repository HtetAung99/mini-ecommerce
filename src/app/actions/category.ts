"use server";

import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { isAdmin, isAuthenticted } from "../../../lib/session";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission) redirect("/admin/categories/?message=authFailed");
  console.log(formData);

  try {
    await prisma.category.create({
      data: formData,
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/categories");
}
