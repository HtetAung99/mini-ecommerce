"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";
import CouponSection from "./coupon-section";
import ShippingFees from "./shipping-fee";

export default function Checkout({ next }: { next: boolean }) {
  const { subTotal } = useCart();
  return (
    <Card
      className={cn(
        "mt-5 max-h-[320px] w-[42%] shrink border-0 bg-[#F8F8F8]",
        next && "w-[35%]",
      )}
    >
      <CardContent>
        <CouponSection />
        <div className="flex items-center justify-between px-2 pt-5 text-sm font-normal">
          <p>Subtotal</p>
          <p>$ {subTotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between px-2 py-5 text-sm font-normal">
          <p>Discount</p>
          <p className="inline-flex items-center gap-1">-$ 2500</p>
        </div>
        <ShippingFees />
        <div className="flex items-center justify-between px-2 py-5 text-base font-semibold">
          <p>Total</p>
          <p className="inline-flex items-center gap-2">$ 50000</p>
        </div>
        {next && (
          <Button
            asChild
            className="mt-2 w-full"
            variant={"default"}
            type="submit"
          >
            <Link href={"/checkout/information"}>Proceed to checkout</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
