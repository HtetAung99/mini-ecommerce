"use client";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import ShippingForm from "./shipping-form";
import SelectedAddress from "./selected-address";
import { OrderContext, shippingConstants } from "@/app/context/order-provider";

export default function ShippingInformation({
  setPaymentIsOpen,
}: {
  setPaymentIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { shippingType, shippingMethod } = useContext(OrderContext);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[30vh] rounded-lg bg-secondary"
    >
      <div className={cn("w-full")}>
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
            className={cn("flex items-center gap-4 text-base ")}
          >
            <Edit size="20px" /> <p>Edit</p>
          </Button>
        </div>
        {!isOpen && (
          <div className="flex flex-col items-center justify-between gap-2 rounded-b-lg px-6">
            <span className="mt-3 inline-flex  w-full py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping Type</p>
              <p className="grow">{shippingType}</p>
            </span>
            <span className="inline-flex w-full py-3 text-base">
              <p className="w-1/3 font-semibold">Shipping method</p>
              <p className="grow">
                {shippingMethod} {shippingConstants[shippingMethod].duration}
              </p>
            </span>

            <div className="flex w-full items-center justify-between py-3 ">
              <span className="w-1/3 font-semibold">
                <p>My Shipping Address</p>
              </span>
            </div>
            <SelectedAddress />
          </div>
        )}
      </div>

      <CollapsibleContent className="px-6 py-2">
        <ShippingForm
          setPaymentIsOpen={setPaymentIsOpen}
          setIsOpen={setIsOpen}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
