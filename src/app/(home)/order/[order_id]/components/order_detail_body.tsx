import React from "react";
import OrderShippingStatus from "./order_shipping_status";
import OrderDetailItem from "./order_detail_item";
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
