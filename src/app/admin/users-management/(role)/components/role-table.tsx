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
import prisma from "../../../../../../lib/prisma";
import { X } from "lucide-react";
import { Permission } from "@prisma/client";
import { Span } from "next/dist/trace";
import { Badge } from "@/components/ui/badge";
import { RoleDeleteBtn } from "./role-delete-btn";
import Link from "next/link";

export const getRandomVariant = (idx: number): string => {
  // without repeating the same variant
  const variants = ["default", "secondary", "destructive", "outline"];
  return variants[idx % variants.length];
};
export default async function RoleTable() {
  //FIXME: need to change to utils
  const roles = await prisma.permissionRole.findMany({
    include: { permissions: true, users: true },
  });
  return (
    <div className="my-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%] border-r">Name</TableHead>
            <TableHead className="w-[25%] border-r">Description</TableHead>
            <TableHead className="w-[37%] border-r">Permissions</TableHead>
            <TableHead className="w-[8%] border-r text-center">Users</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="border-r font-semibold">
                {role.name}
              </TableCell>
              <TableCell className="border-r">{role.description}</TableCell>
              <TableCell className="flex flex-row flex-wrap gap-4 border-r">
                {role.permissions.map((per: Permission, idx: number) => (
                  <Badge
                    className=""
                    variant={getRandomVariant(idx) as any}
                    key={per.id}
                  >
                    {per.name}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="border-r text-center">
                {role.users.length}
              </TableCell>
              <TableCell className="">
                <div className="m-auto flex flex-row justify-around">
                  <Link
                    href={"/admin/users-management/editRole?roleId=" + role.id}
                    className="font-semibold text-blue-500"
                  >
                    Edit
                  </Link>
                  <RoleDeleteBtn roleId={role.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
