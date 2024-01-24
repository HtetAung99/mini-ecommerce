import React from "react";
import Link from "next/link";
import { ArrowBigLeftIcon, ArrowLeft } from "lucide-react";
import OrderSearch from "./components/order_search_bar";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto w-[80%] p-1">
      <span className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold leading-10 tracking-wide">
          Order Page
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
      {children}
    </div>
  );
}
