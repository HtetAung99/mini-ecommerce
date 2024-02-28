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
import { Action, Entity, Permission } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function PermissionTable({
  permissions,
}: {
  permissions: (Permission & { entity: Entity })[];
}) {
  const getBackground = (action: Action) => {
    switch (action) {
      case Action.READ:
        return "bg-blue-100 text-blue-600";
      case Action.CREATE:
        return "bg-green-100 text-green-600";
      case Action.UPDATE:
        return "bg-yellow-100 text-yellow-600";
      case Action.DELETE:
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="my-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%] border-r">Name</TableHead>
            <TableHead className="w-[20%] border-r">Entity</TableHead>
            <TableHead className="w-[40%] border-r">Access</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell className="border-r">{permission.name}</TableCell>
              <TableCell className="border-r">
                {permission.entity.name}
              </TableCell>
              <TableCell className="flex gap-3 border-r">
                {permission.action.map((act: Action) => (
                  <Badge
                    variant={"outline"}
                    className={cn(getBackground(act))}
                    key={act}
                  >
                    {act}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={
                    "users-management/editPermission?permissionId=" +
                    permission.id
                  }
                  className="font-semibold text-blue-600"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
