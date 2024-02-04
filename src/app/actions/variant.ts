"use server";

import { redirect } from "next/navigation";
import { isAdmin, isAuthenticted } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { AttributeValue } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addVariant(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  const { attributeValues, productId, priceDiff, imageUrls } = formData;

  // might not be necessary
  if (!isLogin) redirect("/admin/products/?message=authFailed");

  if (!hasPermission) redirect("/admin/products/?message=authFailed");
  // create new product and connect with variant
  try {
    await prisma.variant.create({
      data: {
        priceDiff,
        attributeValues: {
          connect: attributeValues.map((av: AttributeValue) => ({ id: av.id })),
        },
        imageUrls,
        product: {
          connect: {
            id: parseInt(productId),
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath(`/admin`);
}
