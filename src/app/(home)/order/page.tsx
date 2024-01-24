import React from "react";
import OrderFilter from "./components/order_filter";
import OrderCard from "./components/order_card";

export default function OrderPage() {
  return (
    <>
      <OrderFilter />
      <div className="my-4 flex h-full w-full flex-col gap-4 overflow-auto">
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </>
  );
}
