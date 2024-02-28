import { cache } from "react";
import prisma from "../../../lib/prisma";

const getAllUsers = cache(async (arg: any) => {
  // without password and credentials
  const { roleFilter: role, statusFilter } = arg;
  const roleFilter = typeof role === "string" ? [role] : role;
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      active: true,
      updatedAt: true,
      permissionRoles: true,
      storeAccesses: true,
      groups: true,
    },
    where: {
      role: {
        in: roleFilter,
      },
      active: {
        equals:
          statusFilter === "active"
            ? true
            : statusFilter === "inactive"
              ? false
              : undefined,
      },
    },
  });
  return users;
});

export { getAllUsers };
