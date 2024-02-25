"use server";

import { getExtendedPrisma } from "../../../lib/extendedPrisma";
import { revalidatePath } from "next/cache";

export async function addAttribute(formData: any) {
  const prisma = await getExtendedPrisma();

  await prisma.attribute.create({
    data: {
      name: formData["name"],
    },
  });

  revalidatePath("/admin/attributes");
}

export async function addAttributeValue(formData: any) {
  const { name, value, attributeId } = formData;

  const prisma = await getExtendedPrisma();

  await prisma.attributeValue.create({
    data: {
      name,
      value,
      attribute: {
        connect: {
          id: parseInt(attributeId),
        },
      },
    },
  });

  revalidatePath("/admin/attributes");
}
