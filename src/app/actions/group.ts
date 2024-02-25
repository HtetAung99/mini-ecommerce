"use server";
import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import { GroupAddFormValue } from "../admin/groups/@gp/addGroup/components/group-form";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function addGroup(formData: GroupAddFormValue) {
  const isLogin: boolean = await isAuthenticted();
  const hasPermission: boolean = await isSuperAdmin();
  // FIXME: need more auth check

  if (!isLogin) redirect("/admin/categories/?message=authFailed");

  if (!hasPermission)
    throw new Error("You don't have permission to add permission");

  try {
    const group = await prisma.group.create({
      data: {
        name: formData.name,
        description: formData.descritption,
        permissions: { connect: formData.permissionIds.map((id) => ({ id })) },
      },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/admin/groups");
}

export const assignGroup = async (
  groupId: string,
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
        data: { groups: { connect: { id: groupId } } },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { groups: { disconnect: { id: groupId } } },
      });
    }
    revalidatePath("/admin/groups");
  } catch (error) {
    console.error(error);
  }
};
