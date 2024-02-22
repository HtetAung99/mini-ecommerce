"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Plus, PlusCircle, ShieldCheck, ShieldX, UserCog2 } from "lucide-react";
import { PermissionRole } from "@prisma/client";
import Link from "next/link";
import { addPermission } from "@/app/actions/permission";
import { addPermissionRole } from "@/app/actions/permissionRole";

export default function UserTableEditButton({
  user,
  roles,
}: {
  user: any;
  roles: PermissionRole[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-semibold text-blue-500 focus:ring-0 focus-visible:hidden">
        Edit
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User RBAC</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!user.active ? (
            <DropdownMenuItem>
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Activate</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <ShieldX className="mr-2 h-4 w-4" />
              <span>Deactivate</span>
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserCog2 className="mr-2 h-4 w-4" />
              <span>Assign Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {roles.map((role) => (
                  <DropdownMenuCheckboxItem
                    checked={user.permissionRoles.some(
                      (pr: any) => pr.id === role.id,
                    )}
                    onCheckedChange={(checked: boolean) => {
                      addPermissionRole(role.id, user.id, checked);
                    }}
                    key={role.id}
                  >
                    {role.name}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={"/admin/users-management/addRole"}
                    className="flex items-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add More Roles</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
