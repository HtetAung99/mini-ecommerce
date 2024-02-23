import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/app/utils/users";
import { cn } from "@/lib/utils";
import RoleEdit from "./role-edit";
import UserTableEditButton from "./user-table-edit-button";
import prisma from "../../../../../lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function UserTable() {
  const users = await getAllUsers();
  const roles = await prisma.permissionRole.findMany();
  const groups = await prisma.group.findMany();

  return (
    <div className="my-4">
      <Table>
        <TableCaption>
          You can change role by clicking on the role!
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[18%] border-r">Name</TableHead>
            <TableHead className="w-[20%] border-r">Email</TableHead>
            <TableHead className="w-[15%] border-r text-center">Role</TableHead>
            <TableHead className="w-[10%] border-r text-center">
              Status
            </TableHead>
            <TableHead className="w-[28%] border-r text-center">
              Permission Role
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell className="border-r font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="border-r">{user.email}</TableCell>
                <TableCell className="border-r text-center">
                  <RoleEdit user={user} />
                </TableCell>
                <TableCell
                  className={cn(
                    user.active ? "text-green-500" : "text-red-500",
                    "border-r text-center font-semibold",
                  )}
                >
                  {user.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="flex-1  border-r">
                  {user.permissionRoles?.map((pm) => (
                    <Badge
                      className="mx-1 my-1"
                      variant={"secondary"}
                      key={pm.id}
                    >
                      {pm.name}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-center">
                  <UserTableEditButton
                    key={user.id}
                    user={user}
                    roles={roles}
                    groups={groups}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
