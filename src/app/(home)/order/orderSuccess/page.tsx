"use client";
import { useCart } from "@/app/hooks/useCart";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function OrderSuccessPage() {
  const orderId = useSearchParams().get("orderId");
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  });
  return <div>Order Success : {orderId}</div>;
}
