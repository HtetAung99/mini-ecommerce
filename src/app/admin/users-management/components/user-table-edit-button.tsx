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

import {
  Plus,
  PlusCircle,
  ShieldCheck,
  ShieldX,
  UserCog2,
  Users,
} from "lucide-react";
import { Group, PermissionRole } from "@prisma/client";
import Link from "next/link";
import { addPermissionRole } from "@/app/actions/permissionRole";
import { activateUser } from "@/app/actions/user";
import { useToast } from "@/components/ui/use-toast";

export default function UserTableEditButton({
  user,
  roles,
  groups,
}: {
  user: any;
  roles: PermissionRole[];
  groups: Group[];
}) {
  const { toast } = useToast();
  const handleCheckedChange = async (
    checked: boolean,
    roleId: string,
    userId: string,
  ) => {
    try {
      await addPermissionRole(roleId, userId, checked);
      toast({
        title: "Permission Role",
        description: "Permission Role has been added successfully",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const activateHandler = async (userId: string, status: boolean) => {
    console.log("clicked");
    try {
      await activateUser(userId, status);
    } catch (e) {
      console.error(e);
    }
  };
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
            <DropdownMenuItem
              onClick={() => activateHandler(user.id, !user.active)}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Activate</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => activateHandler(user.id, !user.active)}
            >
              <ShieldX className="mr-2 h-4 w-4" />
              <span>Deactivate</span>
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
                      // try catch
                      handleCheckedChange(checked, role.id, user.id);
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              <span>Add to Group</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {groups.map((gp) => (
                  <DropdownMenuCheckboxItem
                    checked={true}
                    // onCheckedChange={(checked: boolean) => {
                    //   addPermissionRole(role.id, user.id, checked);
                    // }}
                    onCheckedChange={() => {}}
                    key={gp.id}
                  >
                    {gp.name}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={"/admin/groups/addGroup"}
                    className="flex items-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Create Group</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
