import React from "react";
import OrderFilterHeader from "../components/order-filter-header";
import OrderList from "../components/order-list";
import { getOrdersForAdmin } from "@/app/utils/orders";
import { OrderStatus } from "@prisma/client";

export default async function page({ searchParams }: { searchParams: any }) {
  const orders = await getOrdersForAdmin();
  return (
    <main className="">
      <OrderFilterHeader />
      <OrderList orders={orders} />
    </main>
  );
}
