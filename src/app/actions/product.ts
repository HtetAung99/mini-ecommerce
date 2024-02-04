"use server";

import { isAdmin, isAuthenticted } from "../../../lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { defaultVariantData } from "../../../prisma/dataPopulation/product_seeding";
import { revalidatePath } from "next/cache";
import { connect } from "http2";
import { AttributeValue } from "@prisma/client";

export async function addProduct(formData: any) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  const { attributeValues, categoryId, priceDiff, imageUrls, ...productData } =
    formData;

  console.log("productData", productData);

  // might not be necessary
  if (!isLogin) redirect("/admin/products/?message=authFailed");

  if (!hasPermission) redirect("/admin/products/?message=authFailed");
  // create new product and connect with variant
  try {
    await prisma.product.create({
      data: {
        ...productData,
        category: { connect: { id: categoryId } },
        variants: {
          create: [
            {
              priceDiff,
              imageUrls,
              attributeValues: {
                connect: attributeValues.map((av: AttributeValue) => ({
                  id: av.id,
                })),
              },
            },
          ],
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/products", "layout");
}
