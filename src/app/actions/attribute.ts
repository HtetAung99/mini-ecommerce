"use server";

import { isAdmin } from "../../../lib/session";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAttribute(formData: any) {
  const hasPermission: boolean = await isAdmin();

  if (!hasPermission) redirect("/admin/attributes/?message=authFailed");

  try {
    await prisma.attribute.create({
      data: {
        name: formData["name"],
      },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/attributes");
}

export async function addAttributeValue(formData: any) {
  const hasPermission: boolean = await isAdmin();

  if (!hasPermission) redirect("/admin/attributes/?message=authFailed");

  try {
    await prisma.attributeValue.create({
      data: {
        name: formData["name"],
        value: formData["value"],
        attribute: {
          connect: {
            id: parseInt(formData["attributeId"]),
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/attributes");
}
