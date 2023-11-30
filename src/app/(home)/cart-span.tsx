"use client";
import React from "react";
import { useCart } from "../hooks/useCart";

export default function CartSpan({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  return (
    <div className="relative">
      <span className="absolute -right-2 -top-2 inline-block h-5 w-5 rounded-full bg-destructive text-center text-xs font-medium leading-5 text-white">
        {items.length}
      </span>
      {children}
    </div>
  );
}
