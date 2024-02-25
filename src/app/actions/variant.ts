"use server";

import { AttributeValue } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getExtendedPrisma } from "../../../lib/extendedPrisma";

export async function addVariant(formData: any) {
  const { attributeValues, productId, priceDiff, imageUrls } = formData;

  const prisma = await getExtendedPrisma();

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

  revalidatePath(`/admin`);
}
