import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Role } from "@prisma/client";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function isAuthenticted() {
  return (await getCurrentUser()) !== undefined;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === Role.ADMIN;
}

export async function isSuperAdmin() {
  const user = await getCurrentUser();
  return user?.role === Role.SUPERADMIN;
}
