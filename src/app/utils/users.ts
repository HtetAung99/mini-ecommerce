import { cache } from "react";
import prisma from "../../../lib/prisma";

const getAllUsers = cache(async () => {
  // without password and credentials
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      active: true,
      updatedAt: true,
    },
  });
  return users;
});

export { getAllUsers };
