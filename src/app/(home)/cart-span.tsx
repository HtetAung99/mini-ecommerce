"use client";
import React from "react";
import { useCart } from "../hooks/useCart";

export default function CartSpan({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  return (
    <div className="relative">
      <span className="absolute -top-2 -right-2 w-5 h-5 text-center inline-block leading-5 bg-destructive text-xs font-medium text-white rounded-full">
        {items.length}
      </span>
      {children}
    </div>
  );
}
