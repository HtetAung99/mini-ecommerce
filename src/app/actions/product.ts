"use server";

import { isAdmin, isAuthenticted } from "../../../lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { defaultVariantData } from "../../../prisma/dataPopulation/product_seeding";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  const { variantData, ...productData } = formData;

  // might not be necessary
  if (!isLogin) redirect("/admin/products/?message=authFailed");

  if (!hasPermission) redirect("/admin/products/?message=authFailed");

  try {
    await prisma.product.create({
      data: productData,
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/products");
}
