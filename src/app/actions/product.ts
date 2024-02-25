"use server";

import { revalidatePath } from "next/cache";
import { AttributeValue } from "@prisma/client";
import { ProductAddFormValues } from "../admin/products/@productModal/addProduct/components/form";
import { getExtendedPrisma } from "../../../lib/extendedPrisma";

export async function addProduct(formData: ProductAddFormValues) {
  const { attributeValues, categoryId, priceDiff, images, ...productData } =
    formData;

  const prisma = await getExtendedPrisma();
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

  revalidatePath("/admin/products", "layout");
}
