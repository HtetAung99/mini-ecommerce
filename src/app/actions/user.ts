"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";

export const activateUser = async (userId: string, status: boolean) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { active: status },
    });
  } catch (e: any) {
    throw new Error(e);
  }

  revalidatePath("/admin/users-management");
};
