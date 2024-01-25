import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import OrderDetailHeader from "./components/order_detail_header";
import OrderDetailBody from "./components/order_detail_body";
import { getOrderById } from "@/app/utils/orders";
import prisma from "../../../../../lib/prisma";

export default async function OrderDetailPage({
  params,
}: {
  params: { order_id: string };
}) {
  const order_id = params.order_id;

  const order = await getOrderById(order_id);
  const items = await Promise.all(
    order!.orderItems.map(async (item) => {
      const temp = await prisma.variant.findUnique({
        where: { id: item.variantId },
        include: { product: true, attributeValues: true },
      });

      return { ...temp, quantity: item.quantity };
    }),
  );
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
      {/* {order && (
        <> */}
      <OrderDetailHeader order={order!} />
      <OrderDetailBody order={order!} items={items} />
      {/* </>
      )} */}
    </div>
  );
}
