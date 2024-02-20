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

export default async function UserTable() {
  const users = await getAllUsers();

  return (
    <div className="my-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%] border-r">Name</TableHead>
            <TableHead className="w-[30%] border-r">Email</TableHead>
            <TableHead className="w-[20%] ">Role</TableHead>
            <TableHead className="w-[20%] ">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="font-bold capitalize text-slate-500">
                {user.role.toLowerCase()}
              </TableCell>
              <TableCell
                className={cn(
                  user.active ? "text-green-500" : "text-red-500",
                  "font-semibold",
                )}
              >
                {user.active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="text-right">
                <button className="font-semibold text-blue-600">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
