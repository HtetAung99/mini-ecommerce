"use client";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import React, { useState } from "react";
import { PaymentMethod } from "./payment-method";

export default function PaymentInformation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg bg-secondary"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex  flex-row items-center justify-between rounded-t-lg bg-black p-2 text-xl font-semibold  text-white"
      >
        <div className="flex items-center gap-5 pl-4">
          <h6 className="rounded-full bg-white p-2 text-base  leading-none text-black">
            2
          </h6>
          Payment
        </div>
      </div>

      <CollapsibleContent className="px-6 py-2">
        <PaymentMethod />
      </CollapsibleContent>
    </Collapsible>
  );
}
