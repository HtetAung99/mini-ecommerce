import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import OrderDetailHeader from "./components/order_detail_header";
import OrderDetailBody from "./components/order_detail_body";

export default function OrderDetailPage({
  params,
}: {
  params: { order_id: String };
}) {
  const order_id = params.order_id;

  return (
    <div>
      <span className="flex items-center justify-between border-b border-slate-300 pb-3">
        <h1 className="text-2xl font-semibold leading-10 tracking-wide">
          Order Details
        </h1>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-red-400"
          href={"/order"}
        >
          <ArrowLeft size={18} />
          See all orders
        </Link>
      </span>
      <OrderDetailHeader />
      <OrderDetailBody />
    </div>
  );
}
