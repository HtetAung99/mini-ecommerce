import React from "react";
import OrderShippingStatus from "./order_shipping_status";
import OrderDetailItem from "./order_detail_item";

export default function OrderDetailBody() {
  return (
    <div>
      <OrderShippingStatus />
      <div className="my-5 shadow-lg">
        <OrderDetailItem />
        <OrderDetailItem />
        <OrderDetailItem />
      </div>
    </div>
  );
}
