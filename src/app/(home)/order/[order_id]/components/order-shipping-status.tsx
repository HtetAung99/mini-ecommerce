import React from "react";
import OrderAddress from "../../components/order-address";
import OrderProgressBar from "./order-progress-bar";

import { OrderWithItems } from "@/app/types";
import { Order } from "@prisma/client";

export default function OrderShippingStatus({
  order,
}: {
  order: OrderWithItems | Order;
}) {
  return (
    <div className="pl-4">
      <h3 className="text-semibold border-b border-slate-300 pb-3 text-base capitalize tracking-wider">
        {order.shippingType.toLowerCase()}
      </h3>
      <div className="flex w-full justify-between">
        <div className="py-4">
          <h3 className="text-semibold flex gap-2 pb-6 text-base tracking-wide">
            <span className="capitalize">{order.status.toLowerCase()}</span>
            <span> on {new Date(order.updatedAt).toDateString()}</span>
          </h3>
          <OrderProgressBar stage={order.status} />
        </div>
        <OrderAddress addressId={order.addressID} />
      </div>
    </div>
  );
}
