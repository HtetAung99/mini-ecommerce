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
        "w-[42%] mt-5 bg-[#F8F8F8] border-0 shrink max-h-[320px]",
        next && "w-[35%]"
      )}>
      <CardContent>
        <CouponSection />
        <div className="flex items-center text-sm font-normal pt-5 px-2 justify-between">
          <p>Subtotal</p>
          <p>$ {subTotal.toFixed(2)}</p>
        </div>
        <div className="flex font-normal text-sm items-center py-5 px-2 justify-between">
          <p>Discount</p>
          <p className="inline-flex items-center gap-1">-$ 2500</p>
        </div>
        <ShippingFees />
        <div className="flex items-center font-semibold text-base py-5 px-2 justify-between">
          <p>Total</p>
          <p className="inline-flex items-center gap-2">$ 50000</p>
        </div>
        {next && (
          <Button
            asChild
            className="w-full mt-2"
            variant={"default"}
            type="submit">
            <Link href={"/checkout/information"}>Proceed to checkout</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
