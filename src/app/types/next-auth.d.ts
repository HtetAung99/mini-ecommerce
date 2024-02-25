import {
  Address,
  Entity,
  Group,
  Permission,
  PermissionRole,
  Role,
} from "@prisma/client";
import NextAuth from "next-auth";
import {
  GroupWithNestedData,
  PermissionRoleWithNestedData,
  SessionUser,
} from ".";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: SessionUser;
  }
}
