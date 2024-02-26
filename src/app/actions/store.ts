"use server";

import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const assignStore = async (
  storeId: number,
  userId: string,
  isGrant: boolean,
) => {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    if (isGrant) {
      await prisma.user.update({
        where: { id: userId },
        data: { storeAccesses: { push: storeId } },
      });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      await prisma.user.update({
        where: { id: userId },
        data: {
          storeAccesses: {
            set: user?.storeAccesses.filter((sa) => sa !== storeId),
          },
        },
      });
    }

    revalidatePath("/admin/users-management");
  } catch (error) {
    console.error(error);
  }
};
