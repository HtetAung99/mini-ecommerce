"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";
import CouponSection from "./coupon-section";
import { OrderContext, shippingConstants } from "@/app/context/order-provider";
import { Separator } from "@/components/ui/separator";

export default function Checkout({ next }: { next: boolean }) {
  const { subTotal } = useCart();
  const { shippingMethod } = useContext(OrderContext);
  const taxRate = 8.5;
  const beforeTax = subTotal + shippingConstants[shippingMethod].fee;
  const tax = (beforeTax * taxRate) / 100;
  const total = beforeTax + tax;
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
        {/* <div className="flex items-center justify-between px-2 py-5 text-sm font-normal">
          <p>Discount</p>
          <p className="inline-flex items-center gap-1">-$ 2500</p>
        </div> */}
        {!next && (
          <div className="flex items-center justify-between px-2 pt-5 text-sm font-normal">
            <p>Shipping Fee</p>
            <p className="inline-flex items-center gap-1">
              $ {shippingConstants[shippingMethod].fee}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between px-2 pt-5 text-sm font-normal">
          <p>Tax</p>
          <p className="inline-flex items-center gap-1">{tax.toFixed(2)}</p>
        </div>
        <Separator className="my-5" />
        <div className="flex items-center justify-between px-2 pb-4 text-base font-semibold">
          <p>Total</p>
          <p className="inline-flex items-center gap-2">$ {total.toFixed(2)}</p>
        </div>
        {next && (
          <Button
            asChild
            className={cn("mt-2 w-full")}
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
