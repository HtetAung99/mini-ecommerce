import React from "react";
import OrderShippingStatus from "./order-shipping-status";
import OrderDetailItem from "./order-detail-item";
import { OrderWithItems } from "@/app/types";

export default function OrderDetailBody({
  order,
  items,
}: {
  order: OrderWithItems;
  items: any;
}) {
  return (
    <div>
      <OrderShippingStatus order={order} />
      <div className="my-5 shadow-lg">
        {items.map((item: any) => (
          <OrderDetailItem item={item} />
        ))}
      </div>
    </div>
  );
}
