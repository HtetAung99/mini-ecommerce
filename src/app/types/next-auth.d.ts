import {
  Address,
  Entity,
  Group,
  Permission,
  PermissionRole,
  Role,
} from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      role: Role;
      addresses: Address[];
      groups: Group[];
      permissionRoles: (PermissionRole & {
        permissions: (Permission & {
          entity: Entity;
        })[];
      })[];
      selectedAddress: Address;
    };
  }
}
