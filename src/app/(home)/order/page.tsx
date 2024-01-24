import React from "react";
import OrderFilter from "./components/order_filter";
import OrderCard from "./components/order_card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import OrderSearch from "./components/order_search_bar";

export default function OrderPage() {
  return (
    <>
      <span className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold leading-10 tracking-wide">
          Orders
        </h1>
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-red-400"
          href={"/"}
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </span>
      <OrderSearch />
      <OrderFilter />
      <div className="my-4 flex h-full w-full flex-col gap-4 overflow-auto">
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </>
  );
}
