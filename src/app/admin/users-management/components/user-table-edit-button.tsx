"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  PlusCircle,
  ShieldCheck,
  ShieldX,
  UserCog2,
  Users,
} from "lucide-react";
import { Group, PermissionRole, Store } from "@prisma/client";
import Link from "next/link";
import { assignPermissionRole } from "@/app/actions/permissionRole";
import { activateUser } from "@/app/actions/user";
import { useToast } from "@/components/ui/use-toast";
import { assignGroup } from "@/app/actions/group";
import { assignStore } from "@/app/actions/store";

export default function UserTableEditButton({
  user,
  roles,
  groups,
  stores,
}: {
  user: any;
  roles: PermissionRole[];
  groups: Group[];
  stores: Store[];
}) {
  const { toast } = useToast();
  const roleChangeHandler = async (
    checked: boolean,
    roleId: string,
    userId: string,
  ) => {
    try {
      await assignPermissionRole(roleId, userId, checked);
      if (checked) {
        toast({
          title: "Permission Role",
          description: "Permission Role has been added successfully",
        });
      } else {
        toast({
          title: "Permission Role",
          description: "Permission Role has been removed successfully",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const groupChangeHandler = async (
    checked: boolean,
    groupId: string,
    userId: string,
  ) => {
    try {
      await assignGroup(groupId, userId, checked);
      if (checked) {
        toast({
          title: "User Group",
          description: "User Group has been assigned successfully",
        });
      } else {
        toast({
          title: "User Group",
          description: "User Group has been removed successfully",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const storeChangeHanlder = async (
    checked: boolean,
    storeId: number,
    userId: string,
  ) => {
    try {
      await assignStore(storeId, userId, checked);
      if (checked) {
        toast({
          title: "Store Permission",
          description: "Store has been assigned successfully",
        });
      } else {
        toast({
          title: "Store Permission",
          description: "Store has been removed successfully",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const activateHandler = async (userId: string, status: boolean) => {
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
                      roleChangeHandler(checked, role.id, user.id);
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
              <UserCog2 className="mr-2 h-4 w-4" />
              <span>Assign Store</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {stores.map((store) => (
                  <DropdownMenuCheckboxItem
                    checked={user.storeAccesses.includes(store.id)}
                    onCheckedChange={(checked: boolean) => {
                      // try catch
                      storeChangeHanlder(checked, store.id, user.id);
                    }}
                    key={store.id}
                  >
                    {store.name}
                  </DropdownMenuCheckboxItem>
                ))}
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
                {groups.map((group) => (
                  <DropdownMenuCheckboxItem
                    checked={user.groups.some((gp: any) => gp.id === group.id)}
                    onCheckedChange={(checked: boolean) => {
                      groupChangeHandler(checked, group.id, user.id);
                    }}
                    key={group.id}
                  >
                    {group.name}
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
