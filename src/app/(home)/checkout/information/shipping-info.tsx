"use client";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import React, { useState } from "react";

export default function ShippingInformation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[30vh] ">
      <div className="rounded-2xl w-full overflow-auto">
        <div className="flex flex-row items-center justify-between bg-black text-white text-xl p-2  font-semibold">
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
          <div className="flex flex-col justify-between items-center gap-2">
            <span className="inline-flex w-full px-6 py-3 mt-3 text-base">
              <p className="w-1/3 font-semibold">Shipping Type</p>
              <p className="grow">Delivery</p>
            </span>
            <span className="inline-flex w-full px-6 py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping method</p>
              <p className="grow ">
                Standard (estimate within 1 - 3 shipping days*)
              </p>
            </span>
            <span className="inline-flex flex-col w-full px-6 py-3 gap-3 text-base">
              <p className="w-1/3 font-semibold">Shipping address</p>
              <span className="inline-flex w-full p-4 text-sm">
                <p className="w-1/3 text-slate-400">Receiver Name :</p>
                <p className="grow ">Phyo Pyae</p>
              </span>
              <span className="inline-flex w-full p-4 text-sm">
                <p className="w-1/3 text-slate-400">Address Type:</p>
                <p className="grow ">Private</p>
              </span>
              <span className="inline-flex w-full p-4 text-sm">
                <p className="w-1/3 text-slate-400">Phone no.:</p>
                <p className="grow ">0124214333</p>
              </span>
              <span className="inline-flex w-full p-4 text-sm">
                <p className="w-1/3 text-slate-400">Address:</p>
                <p className="grow ">
                  Apt B207 , Bang Talat Khlong Khuean Chachoengsao 92626
                </p>
              </span>
            </span>
          </div>
        )}
      </div>

      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
