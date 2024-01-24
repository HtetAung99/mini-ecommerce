import React from "react";
import OrderAddress from "../../components/order_address";
import OrderProgressBar from "./order_progress_bar";
import { OrderStatus } from "@prisma/client";

export default function OrderShippingStatus() {
  return (
    <div className="">
      <h3 className="text-semibold border-b border-slate-300 pb-3 text-base tracking-wider">
        Shippment
      </h3>
      <div className="flex w-full justify-between">
        <div className="py-4">
          <h3 className="text-semibold pb-6 text-base tracking-wide">
            Shipped on Sep 9, 2023
          </h3>
          <OrderProgressBar stage={OrderStatus.SHIPPED} />
        </div>
        <OrderAddress />
      </div>
    </div>
  );
}
