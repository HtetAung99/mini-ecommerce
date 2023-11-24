"use client";
import { Button } from "@/components/ui/button";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Edit, Truck } from "lucide-react";
import React, { useState } from "react";
import ShippingAddress from "./shipping-address";
import ShippingForm from "./shipping-form";

export default function ShippingInformation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[30vh] bg-secondary rounded-lg">
      <div className={cn("w-full  ")}>
        <div className="flex  flex-row items-center rounded-t-lg justify-between bg-black text-white text-xl p-2  font-semibold">
          <div className="flex gap-5 items-center pl-4">
            <h6 className="rounded-full p-2 bg-white text-base  text-black leading-none">
              1
            </h6>
            Shipping
          </div>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={"ghost"}
            className={cn(" text-base flex gap-4 items-center ")}>
            <Edit size="20px" /> <p>Edit</p>
          </Button>
        </div>
        {!isOpen && (
          <div className="flex flex-col justify-between px-6 items-center gap-2 rounded-b-lg">
            <span className="inline-flex w-full  py-3 mt-3 text-base">
              <p className="w-1/3 font-semibold">Shipping Type</p>
              <p className="grow">Delivery</p>
            </span>
            <span className="inline-flex w-full  py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping method</p>
              <p className="grow ">
                Standard (estimate within 1 - 3 shipping days*)
              </p>
            </span>
            <ShippingAddress withTitle={true} edit={false} />
          </div>
        )}
      </div>

      <CollapsibleContent className="px-6 py-2">
        <ShippingForm />
      </CollapsibleContent>
    </Collapsible>
  );
}
