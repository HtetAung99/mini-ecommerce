"use server";

import { revalidatePath } from "next/cache";
import { AttributeValue } from "@prisma/client";
import { ProductAddFormValues } from "../admin/products/@productModal/addProduct/components/form";
import { getExtendedPrisma } from "../../../lib/extendedPrisma";
import { ProductEditFormValues } from "../admin/products/[product_id]/@productEdit/editProduct/components/product-edit-form";

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

export async function editProduct(formData: ProductEditFormValues) {
  const { id, categoryId, ...rest } = formData;
  const prisma = await getExtendedPrisma();
  await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      categoryId,
    },
  });
  revalidatePath("/admin/products/" + id, "layout");
}
