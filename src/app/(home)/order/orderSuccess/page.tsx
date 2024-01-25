"use client";
import { useCart } from "@/app/hooks/useCart";
import { Order } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderShippingStatus from "../[order_id]/components/order_shipping_status";
import OrderProgressBar from "../[order_id]/components/order_progress_bar";

export default function OrderSuccessPage() {
  const orderId = useSearchParams().get("orderId");
  const paymentIntentId = useSearchParams().get("payment_intent");
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { clearCart } = useCart();

  useEffect(() => {
    fetch(
      `/api/checkout?paymentIntentId=${paymentIntentId}&orderId=${orderId}`,
    ).then(async (res) => {
      if (res.ok) {
        const { respond } = await res.json();
        setOrder(respond);
        setError(undefined);
      } else {
        setOrder(undefined);
        setError((await res.json()).message);
      }
      clearCart();
    });
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <div className="text-center">Loading...</div>}
      {!loading && order && (
        <div className="m-auto mt-10 flex w-[80%] flex-col rounded-md border border-slate-300 p-4 shadow-2xl">
          <h1 className="text-center text-2xl font-bold leading-10 tracking-wider text-green-600">
            Order Success
          </h1>

          <div className="tracking m-auto w-[80%] py-5 text-center text-base leading-7">
            <p className="leading-10">
              Your order id is{" "}
              <span className="font-semibold">
                <Link href={"/order/" + order.id}>{order.id}</Link>
              </span>
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
          <div className=" py-4 ">
            <OrderProgressBar stage={order.status} />
          </div>
          <div className=" flex justify-between px-5 py-3 ">
            <Link
              className="m-auto max-w-fit text-center text-sm font-semibold tracking-wide text-red-400"
              href={"/"}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
      {!loading && error && (
        <h1 className=" m-auto py-10 text-center text-xl capitalize text-red-400">
          {error}
        </h1>
      )}
    </>
  );
}
