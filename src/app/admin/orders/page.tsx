import React from "react";
import OrderFilterHeader from "../components/order-filter-header";
import OrderList from "../components/order-list";
import { getOrdersForAdmin } from "@/app/utils/orders";

export default async function page() {
  const orders = await getOrdersForAdmin();
  return (
    <main className="">
      <OrderFilterHeader />
      <OrderList orders={orders} />
    </main>
  );
}
