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
      className="bg-secondary rounded-lg">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex  flex-row items-center rounded-t-lg justify-between bg-black text-white text-xl p-2  font-semibold">
        <div className="flex gap-5 items-center pl-4">
          <h6 className="rounded-full p-2 bg-white text-base  text-black leading-none">
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
