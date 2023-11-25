"use client";

import { useCart } from "@/app/hooks/useCart";

export default function CartHeader() {
  const { items } = useCart();
  return (
    <h5 className="text-lg font-semibold">{`Cart ( ${items.length} )`}</h5>
  );
}
