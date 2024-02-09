import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "@prisma/client";
import AdminOrderTableRow from "./admin-order-table-row";

export default function AdminOrderItemDetailTable({
  orderList,
}: {
  orderList: OrderItem[];
}) {
  return (
    <>
      <h1 className="px-2 text-base font-medium leading-9 tracking-widest">
        Order Details
      </h1>
      <div className="m-2 rounded-lg border border-slate-200 p-2">
        <Table>
          <TableHeader className="font-bold tracking-widest text-slate-400">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((orderItem: OrderItem) => (
              <AdminOrderTableRow orderItem={orderItem} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
