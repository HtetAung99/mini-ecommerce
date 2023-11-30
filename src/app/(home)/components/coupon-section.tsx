import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function CouponSection() {
  return (
    <div className="mx-0 flex w-full max-w-sm items-center space-x-2 border-b border-slate-200 px-0 py-3">
      <Input
        className="border-0"
        type="coupon"
        placeholder="Enter coupon code"
      />
      <Button variant={"outline"} type="submit">
        Apply
      </Button>
    </div>
  );
}
