import React from "react";
import OrderCardHeader from "./order-card-header";
import OrderCardBody from "./order-card-body";
import { OrderWithItems } from "@/app/types";
import prisma from "../../../../../lib/prisma";

export default async function OrderCard({ order }: { order: OrderWithItems }) {
  const items = await Promise.all(
    order.orderItems.map(async (item) => {
      const temp = await prisma.variant.findUnique({
        where: { id: item.variantId },
        include: { product: true, attributeValues: true },
      });

      return { ...temp, quantity: item.quantity };
    }),
  );

  return (
    <div className="w-full rounded-sm border border-slate-200 bg-[#F8F8F8] shadow-lg">
      <OrderCardHeader order={order} />
      {items.map((item) => (
        <OrderCardBody order={order} item={item} />
      ))}
    </div>
  );
}
