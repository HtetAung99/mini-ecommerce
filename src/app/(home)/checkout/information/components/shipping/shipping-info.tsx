"use client";
import { Button } from "@/components/ui/button";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Edit, Truck } from "lucide-react";
import React, { useState } from "react";
import ShippingForm from "./shipping-form";
import SelectedAddress from "./selected-address";

export default function ShippingInformation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[30vh] rounded-lg bg-secondary"
    >
      <div className={cn("w-full  ")}>
        <div className="flex  flex-row items-center justify-between rounded-t-lg bg-black p-2 text-xl font-semibold  text-white">
          <div className="flex items-center gap-5 pl-4">
            <h6 className="rounded-full bg-white p-2 text-base  leading-none text-black">
              1
            </h6>
            Shipping
          </div>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={"ghost"}
            className={cn(" flex items-center gap-4 text-base ")}
          >
            <Edit size="20px" /> <p>Edit</p>
          </Button>
        </div>
        {!isOpen && (
          <div className="flex flex-col items-center justify-between gap-2 rounded-b-lg px-6">
            <span className="mt-3 inline-flex  w-full py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping Type</p>
              <p className="grow">Delivery</p>
            </span>
            <span className="inline-flex w-full  py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping method</p>
              <p className="grow ">
                Standard (estimate within 1 - 3 shipping days*)
              </p>
            </span>
            <SelectedAddress
              withTitle={true}
              title={"Shipping address"}
              edit={false}
            />
          </div>
        )}
      </div>

      <CollapsibleContent className="px-6 py-2">
        <ShippingForm />
      </CollapsibleContent>
    </Collapsible>
  );
}
