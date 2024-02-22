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
import prisma from "../../../../../lib/prisma";
import { X } from "lucide-react";
import { Permission } from "@prisma/client";
import { Span } from "next/dist/trace";

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
            <TableHead className="w-[30%] ">Permissions</TableHead>
            <TableHead className="w-[15%] text-center">
              Assigned Users
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="border-r">{role.name}</TableCell>
              <TableCell className="border-r">{role.description}</TableCell>
              <TableCell className="flex flex-row flex-wrap gap-4">
                {role.permissions.map((per: Permission) => (
                  <span key={per.id}>{per.name}</span>
                ))}
              </TableCell>
              <TableCell className="text-center">{role.users.length}</TableCell>
              <TableCell className="text-right">
                <button className="text-red-500">
                  <span className="sr-only">Delete</span>
                  <X />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
