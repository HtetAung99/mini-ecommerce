"use server";
import { redirect } from "next/navigation";
import { isAuthenticted, isSuperAdmin } from "../../../lib/session";
import { GroupAddFormValue } from "../admin/groups/@gp/addGroup/components/group-form";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { GroupEditFormValue } from "../admin/groups/@gp/editGroup/components/gp-edit-form";

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

export async function deleteGroup(groupId: string) {
  await prisma.group.delete({ where: { id: groupId } });
  revalidatePath("/admin/groups");
}

export async function editGroup(formData: GroupEditFormValue) {
  const { gpId, ...data } = formData;
  const updatedGroup = await prisma.group.update({
    where: { id: gpId },
    data: {
      name: data.name,
      description: data.descritption,
      permissions: { set: data.permissionIds.map((id) => ({ id })) },
    },
  });
  revalidatePath("/admin/groups");
}

export async function assginUsersToGroup(groupId: string, userIds: string[]) {
  const existingUserIds = (
    await prisma.group.findUnique({
      where: { id: groupId },
      include: { users: true },
    })
  )?.users.map((user) => user.id);

  const group = await prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        connect: userIds.map((id) => ({ id })),
        disconnect: existingUserIds
          ?.filter((id) => !userIds.includes(id))
          .map((id) => ({ id })),
      },
    },
  });
  revalidatePath("/admin/groups");
  revalidatePath("/admin/users-management/users");
}
