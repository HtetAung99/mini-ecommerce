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
import { Permission } from "@prisma/client";
import { GroupDeleteButton } from "./group-delete-btn";
import { Badge } from "@/components/ui/badge";
import { getRandomVariant } from "../../users-management/(role)/components/role-table";
import Link from "next/link";

export default async function GroupTable() {
  // FIXME: need to change to utils later
  const groups = await prisma.group.findMany({
    include: { permissions: true, users: true },
  });
  return (
    <div className="my-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%] border-r">Group Name</TableHead>
            <TableHead className="w-[25%] border-r text-left">
              Descritpion
            </TableHead>

            <TableHead className="w-[40%] border-r">Permissions</TableHead>
            <TableHead className="w-[10%] border-r text-center">
              Members
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="border-r font-medium">
                {group.name}
              </TableCell>
              <TableCell className="border-r">{group.description}</TableCell>
              <TableCell className="flex flex-wrap gap-3 border-r">
                {group.permissions.map((per: Permission, idx: number) => (
                  <Badge key={per.id} variant={getRandomVariant(idx) as any}>
                    {per.name}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="border-r text-center">
                {group.users.length}
              </TableCell>
              <TableCell className="">
                <div className="m-auto flex flex-row justify-around">
                  <Link
                    href={"/admin/groups/editGroup?gpId=" + group.id}
                    className="font-semibold text-blue-500"
                  >
                    Edit
                  </Link>
                  <GroupDeleteButton groupId={group.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
