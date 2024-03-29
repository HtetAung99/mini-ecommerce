import React from "react";
import Checkout from "../components/checkout";
import OrderItemList from "./components/order-item-list";

export default function CartPage() {
  return (
    <div className="flex flex-row justify-between gap-5">
      <OrderItemList />
      <Checkout next={true} />
    </div>
  );
}
