import { OrderWithItems } from "@/app/types";
import Link from "next/link";
import React from "react";

export default function OrderCardHeader({ order }: { order: OrderWithItems }) {
  return (
    <div className="flex flex-row  items-center justify-between border-l-4 border-slate-600 px-5 py-2 text-sm">
      <span className="flex-1 leading-8 tracking-wider">
        <strong>Online Order : </strong>
        {order.id.slice(10, 25)}
      </span>
      <span className="basis-1/5 tracking-wide ">
        {new Date(order.createdAt).toDateString()}
      </span>
      <Link
        className="basis-1/3 text-end font-medium tracking-wide text-accent-foreground"
        href={`/order/${order.id}`}
      >
        See Details &gt;
      </Link>
    </div>
  );
}
