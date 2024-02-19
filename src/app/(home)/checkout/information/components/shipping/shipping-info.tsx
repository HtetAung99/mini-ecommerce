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
      // className="mt-5 min-h-[30vh] rounded-lg bg-secondary"
      className="mt-5 rounded-lg bg-secondary md:min-h-[30vh]"
    >
      <div className={cn("w-full")}>
        <div className="flex  flex-row items-center justify-between rounded-t-lg bg-black p-2 text-xl font-semibold  text-white">
          {/* <div className="flex items-center gap-5 pl-4"> */}
          <div className="flex items-center gap-3 pl-2 md:gap-5 md:pl-4">
            <h6 className="rounded-full bg-white p-2 text-base  leading-none text-black">
              1
            </h6>
            {/* Shipping */}
            <span className="text-sm md:text-base">Shipping</span>
          </div>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
              setPaymentIsOpen(false);
            }}
            variant={"ghost"}
            // className={cn("flex items-center gap-4 text-base ")}
            className={cn(
              "flex items-center gap-2 text-sm md:gap-4 md:text-base",
            )}
          >
            <Edit size="20px" /> <p>Edit</p>
          </Button>
        </div>
        {!isOpen && (
          // <div className="flex flex-col items-center justify-between gap-2 rounded-b-lg px-6">
          <div className="flex flex-col items-center justify-between gap-2 rounded-b-lg px-4 md:gap-4 md:px-6">
            {/* Adjusted gap and padding for small screens */}
            {/* <span className="mt-3 inline-flex  w-full py-3 text-base"> */}
            <span className="mt-3 inline-flex w-full py-2 text-sm md:text-base">
              {" "}
              {/* Adjusted font size for small screens */}
              <p className="w-1/3 font-semibold">Shipping Type</p>
              <p className="grow">{shippingType}</p>
            </span>
            {/* <span className="inline-flex w-full py-3 text-base"> */}
            <span className="inline-flex w-full py-2 text-sm md:text-base">
              {/* Adjusted font size for small screens */}
              <p className="w-1/3 font-semibold">Shipping method</p>
              <p className="grow">
                {shippingMethod} {shippingConstants[shippingMethod].duration}
              </p>
            </span>
            {/* <div className="flex w-full items-center justify-between py-3 "> */}
            <div className="flex w-full items-center justify-between py-2 text-sm md:py-3 md:text-base">
              {/* Adjusted padding for small screens */}
              <span className="w-1/3 font-semibold">
                <p>My Shipping Address</p>
              </span>
            </div>
            <SelectedAddress />
          </div>
        )}
      </div>

      {/* <CollapsibleContent className="px-6 py-2"> */}
      <CollapsibleContent className="px-4 py-2 md:px-6">
        {/* Adjusted padding for small screens */}
        <ShippingForm
          setPaymentIsOpen={setPaymentIsOpen}
          setIsOpen={setIsOpen}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
