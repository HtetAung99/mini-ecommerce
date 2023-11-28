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
    <div className="grow max-h-[38vw] py-3 px-1 mt-5 overflow-x-auto">
      {items.map((item) => (
        <OrderItem item={item} />
      ))}
      <Button
        onClick={() => router.back()}
        variant="link"
        className="inline-flex items-center gap-3 mt-3 text-destructive font-normal text-sm">
        <ChevronLeft size={"16px"} />
        Continue shopping
      </Button>
    </div>
  );
}
