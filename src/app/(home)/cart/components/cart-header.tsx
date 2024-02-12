"use client";

import { useCart } from "@/app/hooks/useCart";
import { Button } from "@/components/ui/button";

export default function CartHeader() {
  const { items, clearCart } = useCart();
  return (
    <div className="flex flex-row items-center justify-between">
      <h5 className="text-lg font-semibold">{`Cart ( ${items.length} )`}</h5>
      <Button
        variant={"link"}
        onClick={clearCart}
        className="font-semibold leading-7 tracking-wider text-red-500"
      >
        Clear Cart
      </Button>
    </div>
  );
}
