"use client";

import { useCart } from "@/app/hooks/useCart";
import OrderItem from "./order-item";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderIemlist() {
  const router = useRouter();
  const { items } = useCart();

  return (
    <div className="mt-5 flex max-h-[38vw] w-full flex-col px-1 py-3">
      {items.map((item) => (
        <OrderItem key={item.variantId} item={item} />
      ))}
      <Button
        onClick={() => router.back()}
        variant="link"
        className="mt-3 inline-flex w-[20%] items-center gap-3 text-sm font-normal text-destructive"
      >
        <ChevronLeft size={"16px"} />
        Continue shopping
      </Button>
    </div>
  );
}
