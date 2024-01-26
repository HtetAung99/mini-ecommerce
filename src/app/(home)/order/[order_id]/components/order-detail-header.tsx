import React from "react";
import OrderDetailAmount from "./order-detail-amount";
import Link from "next/link";
import { LucideReceipt } from "lucide-react";
import { OrderWithItems } from "@/app/types";

export default function OrderDetailHeader({
  order,
}: {
  order: OrderWithItems;
}) {
  return (
    <div className="flex flex-row justify-between gap-3">
      <div className="flex basis-3/5 flex-col justify-start gap-2 py-5">
        <span className="inline-flex items-center text-sm tracking-wide">
          <p className="w-1/4 font-semibold ">Purchase Date:</p>
          <p className="tracking-widest">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </span>
        <span className="inline-flex items-center text-sm tracking-wide">
          <p className="w-1/4 font-semibold ">Order Number:</p>
          <p className="tracking-widest">{order.id}</p>
        </span>
        <Link
          className="flex items-center gap-2 py-2 text-sm font-bold"
          href={"#"}
        >
          <LucideReceipt size={18} />
          View Receipt
        </Link>
      </div>

      <OrderDetailAmount order={order} />
    </div>
  );
}
