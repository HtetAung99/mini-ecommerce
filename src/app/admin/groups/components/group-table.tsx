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

export default async function GroupTable() {
  return (
    <div className="my-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%] border-r">Group Name</TableHead>
            <TableHead className="w-[25%] text-left">Descritpion</TableHead>

            <TableHead className="w-[25%] ">Members</TableHead>
            <TableHead className="w-[25%]">Permissions</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
}
