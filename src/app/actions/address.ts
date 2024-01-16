"use server";

import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { isAuthenticted } from "../../../lib/session";
import { revalidatePath } from "next/cache";

export async function addAddress(formData: any) {
  const isLogin: boolean = await isAuthenticted();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");
  const { userId, isDefault, ...data } = formData;
  // console.log(data);

  // check if user has default address
  try {
    const defaultAddress = await prisma.address.findFirst({
      where: { userId, default: true },
    });

    // if not, set this address as default
    if (!defaultAddress) {
      await prisma.address.create({ data: { userId, ...data, default: true } });
    } else {
      if (isDefault) {
        await prisma.address.update({
          where: { id: defaultAddress.id },
          data: { default: false },
        });
      }
      await prisma.address.create({
        data: { userId, ...data, default: isDefault },
      });
    }
    revalidatePath("/checkout/information");
    redirect("/checkout/information");
  } catch (e) {
    console.log(e);
  }
}
