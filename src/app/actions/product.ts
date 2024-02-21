"use server";

import { isAdmin, isAuthenticted } from "../../../lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { AttributeValue } from "@prisma/client";
import { ProductAddFormValues } from "../admin/products/@productModal/addProduct/components/form";

export async function addProduct(formData: ProductAddFormValues) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isAdmin();

  const { attributeValues, categoryId, priceDiff, images, ...productData } =
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
              imageUrls: images,
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
    console.log("Done db operation");
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/products", "layout");
}
