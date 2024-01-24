"use client";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function OrderSuccessPage() {
  const orderId = useSearchParams().get("orderId");
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="m-auto mt-10 flex w-[80%] flex-col rounded-md border border-slate-300 p-4 shadow-2xl">
      <h1 className="text-center text-2xl font-bold leading-10 tracking-wider text-green-600">
        Order Success
      </h1>

      <div className="tracking m-auto w-[80%] py-5 text-center text-base leading-7">
        <p className="leading-10">
          Your order id is <span className="font-semibold">{orderId}</span>
        </p>
        <p>
          Your order is currently being processed. You will receive an order
          confimation email shortly with the expected delivery date for your
          items.
        </p>
      </div>
      <h3 className="py-3 text-center text-xl font-bold leading-10 tracking-wider ">
        Thank you for shopping with us!
      </h3>
      <Link
        className="m-auto max-w-fit text-center text-sm font-semibold tracking-wide text-red-400"
        href={"/"}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
